import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase'; // Make sure this path is correct in your project

const GpaChart = () => {
  const [gpaData, setGpaData] = useState([]);

 useEffect(() => {
  const fetchGpaData = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setGpaData(
          (userData.gpaHistory || []).map((item) => ({
            semester: `Sem ${item.semester}`,
            gpa: parseFloat(item.gpa),
          }))
        );
      }
    }
  };

  fetchGpaData();
}, []);
  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>📈 GPA Progress Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={gpaData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#764ba2" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#667eea" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="semester" stroke="#fff" />
          <YAxis stroke="#fff" domain={[0, 10]} />
          <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
          <Legend wrapperStyle={{ color: '#fff' }} />
          <Line
            type="monotone"
            dataKey="gpa"
            stroke="#fff"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#gpaGradient)"
            dot={{ fill: '#fff', r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const styles = {
  chartContainer: {
    marginTop: '30px',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    color: '#fff',
  },
  chartTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '20px',
    color: '#fff',
    textShadow: '1px 1px 2px #000',
  },
};

export default GpaChart;