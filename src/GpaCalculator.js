import React, { useState } from 'react';
import { auth, db } from "./firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import './GpaCalculator.css';

const GpaCalculator = () => {
  const [dept, setDept] = useState('');
  const [sem, setSem] = useState('');
  const [courses, setCourses] = useState([{ code:'', name:'', credits:'', grade:'O' }]);
  const [gpa, setGpa] = useState(null);

  const gradePoints = { O:10,"A+":9,A:8,"B+":7,B:6,C:5,U:0 };

  const curriculum = {
    CSE: {
      1: [ { code:"HS8151",name:"Communicative English" },{ code:"MA8151",name:"Math I" },{ code:"PH8151",name:"Physics" },{ code:"CY8151",name:"Chemistry" },{ code:"CS8151",name:"Problem Solving & Python" },{ code:"GE8161",name:"Python Lab" },{ code:"BS8161",name:"Physics/Chem Lab" } ],
      2: [ { code:"HS8251",name:"Technical English" },{ code:"MA8251",name:"Math II" },{ code:"PH8252",name:"Physics Info Sci." },{ code:"BE8255",name:"Basic EEE" },{ code:"CS8251",name:"C Programming" },{ code:"GE8261",name:"Engg Practices Lab" },{ code:"CS8261",name:"C Programming Lab" } ],
      3: [ { code:"MA8351",name:"Linear Algebra & ODE" },{ code:"CS8351",name:"Data Structures" },{ code:"CS8391",name:"DBMS" },{ code:"CS8392",name:"OOSD" },{ code:"CS8393",name:"Microprocessors" },{ code:"CS8394",name:"Computer Architecture" },{ code:"CS8395",name:"Operating Systems" },{ code:"CS8361",name:"DS Lab" },{ code:"CS8362",name:"DBMS Lab" } ],
      4: [ { code:"CS8451",name:"Design & Analysis Algo" },{ code:"CS8471",name:"Java Programming" },{ code:"CS8491",name:"Computer Networks" },{ code:"CS8492",name:"Software Engg" },{ code:"CS8493",name:"Theory of Computation" },{ code:"CS8461",name:"Networks Lab" },{ code:"CS8462",name:"Java Lab" } ],
      5: [ { code:"CS8591",name:"AI & Machine Learning" },{ code:"CS8592",name:"Compiler Design" },{ code:"CS8593",name:"Cryptography" },{ code:"CS8594",name:"Mobile Computing" },{ code:"CS8561",name:"AI Lab" },{ code:"CS8562",name:"Compiler Lab" } ],
      6: [ { code:"CS8691",name:"Cloud Computing" },{ code:"CCS865",name:"Soft Computing" },{ code:"CS8651",name:"Embedded Systems" },{ code:"CS8692",name:"Cyber Security" },{ code:"CS8661",name:"Cloud Lab" },{ code:"CS8662",name:"Security Lab" } ],
      7: [ { code:"CS8791",name:"Human Values & Ethics" },{ code:"CS8701",name:"Project Phase I" },{ code:"CS87E1",name:"Elective I" },{ code:"CS87E2",name:"Elective II" } ],
      8: [ { code:"CS8891",name:"Project Phase II" },{ code:"CS88E1",name:"Elective III" },{ code:"CS88E2",name:"Elective IV" } ],
    },
    ECE: {
      1: [ { code:"HS8151",name:"Communicative English" },{ code:"MA8151",name:"Math I" },{ code:"PH8151",name:"Physics" },{ code:"CY8151",name:"Chemistry" },{ code:"EC8151",name:"Problem Solving & Python" },{ code:"GE8161",name:"Python Lab" },{ code:"BS8161",name:"Physics/Chem Lab" } ],
      2: [ { code:"HS8251",name:"Technical English" },{ code:"MA8251",name:"Math II" },{ code:"PH8253",name:"Physics Elec. Engg" },{ code:"EC8251",name:"Circuit Analysis" },{ code:"EC8252",name:"Electronic Devices" },{ code:"EC8261",name:"Devices Lab" } ],
      3: [ { code:"MA8353",name:"Random Proc & LA" },{ code:"CS8353",name:"C & DS" },{ code:"EC8354",name:"Signals & Systems" },{ code:"EC8353",name:"Electronic Devices Circuits" },{ code:"EC8351",name:"Control Systems" },{ code:"EC8352",name:"Digital Systems Design" },{ code:"EC8361",name:"Devices Lab" },{ code:"CS8362",name:"C/DS Lab" } ],
      4: [ { code:"EC8452",name:"Electromagnetic Fields" },{ code:"EC8401",name:"Networks & Security" },{ code:"EC8451",name:"LIC" },{ code:"EC8492",name:"DSP" },{ code:"EC8491",name:"Comm Systems" },{ code:"EC8462",name:"LIC Lab" },{ code:"EC8461",name:"Comm Lab" } ],
      5: [ { code:"EC8501",name:"Wireless Comm" },{ code:"EC8552",name:"VLSI & Chip Design" },{ code:"EC8551",name:"RF Systems" },{ code:"EC8561",name:"VLSI Lab" } ],
      6: [ { code:"EC8651",name:"Embedded Systems" },{ code:"CS8652",name:"AI & ML" },{ code:"ET8691",name:"IoT Design" },{ code:"EC8661",name:"Embedded Lab" } ],
      7: [ { code:"GE8791",name:"Human Values & Ethics" },{ code:"EC8711",name:"Internship" },{ code:"EC87E1",name:"Elective I" } ],
      8: [ { code:"EC8811",name:"Project Work" },{ code:"EC88E1",name:"Elective II" } ],
    },
    MECH: {
      1: [ { code:"HS8151",name:"Communicative English" },{ code:"MA8151",name:"Math I" },{ code:"PH8151",name:"Physics" },{ code:"CY8151",name:"Chemistry" },{ code:"ME8151",name:"Problem Solving & Python" },{ code:"GE8161",name:"Python Lab" },{ code:"BS8161",name:"Physics/Chem Lab" } ],
      2: [ { code:"HS8251",name:"Technical English" },{ code:"MA8251",name:"Math II" },{ code:"BE8253",name:"Basic Electrical Engg" },{ code:"GE8292",name:"Engineering Mechanics" },{ code:"ME8251",name:"Engineering Graphics" },{ code:"ME8261",name:"CAD Lab"} ],
      3: [ { code:"MA8353",name:"Transforms & PDEs" },{ code:"ME8351",name:"Thermodynamics I" },{ code:"ME8352",name:"Fluid Mechanics" },{ code:"ME8353",name:"Material Science" },{ code:"GE8353",name:"Environmental Science" },{ code:"ME8361",name:"Thermo Lab" } ],
      4: [ { code:"ME8451",name:"Manufacturing Tech" },{ code:"ME8452",name:"Mechanics of Solids" },{ code:"ME8453",name:"Kinematics of Machines" },{ code:"ME8454",name:"Measurement & Metrology" },{ code:"ME8461",name:"Metrology Lab" } ],
      5: [ { code:"ME8501",name:"Dynamics of Machines" },{ code:"ME8551",name:"Manufacturing Processes" },{ code:"ME8552",name:"Machine Design I" },{ code:"ME8561",name:"Manufacturing Lab" } ],
      6: [ { code:"ME8651",name:"Thermal Engineering I" },{ code:"ME8652",name:"Machine Design II" },{ code:"ME8653",name:"Mechanics of Solids II" },{ code:"ME8661",name:"Thermo Lab II" } ],
      7: [ { code:"GE8791",name:"Human Values & Ethics" },{ code:"ME8711",name:"Internship" },{ code:"ME87E1",name:"Elective I" } ],
      8: [ { code:"ME8811",name:"Project Work" },{ code:"ME88E1",name:"Elective II" } ],
    },
  };

  const annaCourses = dept && sem ? (curriculum[dept]?.[sem] || []) : [];
  
  const handleChange = (i, f, v) => {
    const arr=[...courses]; arr[i][f]=v; setCourses(arr);
  };
  
  const addCourse = () => setCourses([...courses,{code:'',name:'',credits:'',grade:'O'}]);

  const calculateGPA = async() => {
    let totC=0, totP=0;
    courses.forEach(c=>{
      const cr=parseFloat(c.credits);
      if(!isNaN(cr)){
        totC+=cr; totP+=gradePoints[c.grade]*cr;
      }
    });
    const finalGpa=totC>0?(totP/totC).toFixed(2):0;
    setGpa(finalGpa);

    const uid=auth.currentUser?.uid;
    if(uid){
      const ur=doc(db,'users',uid);
      await updateDoc(ur,{ gpa:finalGpa, gpaHistory: arrayUnion({
        date:new Date().toISOString(),
        department:dept,
        semester:sem,
        gpa:finalGpa,
        totalCredits:totC,
        courses
      })});
    }
  };

  return (
    <div className="calculator-container">
      <h2 className="calculator-title">📘 GPA Genius</h2>

      <div style={{textAlign:'center',marginBottom:'20px'}}>
        <select value={dept} onChange={e=>{setDept(e.target.value);setSem('');setCourses([{code:'',name:'',credits:'',grade:'O'}]);}} className="calculator-input">
          <option value="">🎓 Select Dept</option>
          {Object.keys(curriculum).map(d=> <option key={d} value={d}>{d}</option>)}
        </select>

        {dept && <select value={sem} onChange={e=>{setSem(e.target.value);setCourses([{code:'',name:'',credits:'',grade:'O'}]);}} className="calculator-input" style={{marginTop:'10px'}}>
          <option value="">📚 Select Sem</option>
          {[...Array(8)].map((_,i)=> <option key={i+1} value={i+1}>Semester {i+1}</option>)}
        </select>}
      </div>

      {courses.map((course,i)=>(
        <div key={i} style={{marginBottom:'15px'}}>
          <select value={course.code} onChange={e=>{
            const sel=annaCourses.find(c=>c.code===e.target.value) || {code:'',name:''};
            handleChange(i,'code',sel.code); handleChange(i,'name',sel.name);
          }} className="calculator-input">
            <option value="">Select Course</option>
            {annaCourses.map(co=> <option key={co.code} value={co.code}>{co.code} - {co.name}</option>)}
          </select>
          <input type="number" placeholder="Credits" value={course.credits} onChange={e=>handleChange(i,'credits',e.target.value)} className="calculator-input"/>
          <select value={course.grade} onChange={e=>handleChange(i,'grade',e.target.value)} className="calculator-input">
            {Object.keys(gradePoints).map(gr=> <option key={gr} value={gr}>{gr}</option>)}
          </select>
        </div>
      ))}

      <div className="calculator-buttons">
        <button onClick={addCourse} className="calculator-button">➕ Add Course</button>
        <button onClick={calculateGPA} className="calculator-button">🧮 Calculate GPA</button>
      </div>

      {gpa!==null && <h3 style={{textAlign:'center'}}>📊 Your GPA: {gpa}</h3>}
    </div>
  );
};

export default GpaCalculator;