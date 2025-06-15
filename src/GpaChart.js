import React from 'react'; import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';

const data = [ { semester: 'Sem 1', gpa: 8.2 }, { semester: 'Sem 2', gpa: 8.5 }, { semester: 'Sem 3', gpa: 8.9 }, { semester: 'Sem 4', gpa: 9.1 }, { semester: 'Sem 5', gpa: 9.3 }, ];

const GpaChart = () => { return ( <div style={styles.chartContainer}> <h3 style={styles.chartTitle}>📈 GPA Progress Chart</h3> <ResponsiveContainer width="100%" height={300}> <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} > <defs> <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1"> <stop offset="0%" stopColor="#764ba2" stopOpacity={0.8} /> <stop offset="100%" stopColor="#667eea" stopOpacity={0.2} /> </linearGradient> </defs> <CartesianGrid strokeDasharray="3 3" stroke="#ccc" /> <XAxis dataKey="semester" stroke="#fff" /> <YAxis stroke="#fff" domain={[0, 10]} /> <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} /> <Legend wrapperStyle={{ color: '#fff' }} /> <Line type="monotone" dataKey="gpa" stroke="#fff" strokeWidth={3} fillOpacity={1} fill="url(#gpaGradient)" dot={{ fill: '#fff', r: 5 }} activeDot={{ r: 8 }} /> </LineChart> </ResponsiveContainer> </div> ); };

const styles = { chartContainer: { marginTop: '30px', background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '16px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', color: '#fff', }, chartTitle: { textAlign: 'center', marginBottom: '20px', fontSize: '20px', color: '#fff', textShadow: '1px 1px 2px #000', }, };

export default GpaChart;