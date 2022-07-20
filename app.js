const express = require('express');
const app = express();
const joi = require('joi')
app.use(express.json());

const students=[
    {stuID:1, stuname:'mohamed',deg:30},
     {stuID:2, stuname:'ali',deg:50},
     {stuID:3, stuname:'saad',deg:60},
     {stuID:4, stuname:'sameir',deg:40}
]

app.get('/',(req,res)=>{
    res.send(students)
    
    
})
app.get('/:id' ,(req,res)=>{
    const findstudent=students.find(elment=>elment.stuID==req.params.id)
    if(!findstudent){
        res.send('this student is not find..')
    }
    res.send(findstudent)
})
app.post('/add/student', (req,res)=>{
    const add ={
        stuID:joi.number().integer().required(),
        stuname:joi.string().min(3).required(),
        deg:joi.number().integer().required()
    }
    const joierror=joi.ValidationError(req.body,add)
    if(joierror.error){
        return res.send(joierror.error.details[0].message)
    };
    const nstudent={
        stuID:req.body.id,
        stuname:req.body.stuname,
        deg:req.body.deg
    };
    students.push(nstudent);
    res.send(nstudent);
});
app.listen(3000);