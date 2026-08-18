#!/usr/bin/env node
const fs=require('fs');
const path=require('path');

const filepath=path.join(__dirname,'task.json');


function loadtasks()
{
    if(!fs.existsSync(filepath))
        return[];

    const data=fs.readFileSync(filepath,'utf8');
    return JSON.parse(data || '[]');
}

function savetasks(tasks)
{
    fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2), 'utf8');
}

function reorder(tasks)
{
    let i=1;
    tasks.forEach(task=>{
        task.id=i;
        i++;
    });
}
const args=process.argv.slice(2);
const command=args[0];

if(command==='add')
{
    const description=args[1];

    if(!description)
    {
        console.log("Error : Please provide a valid description");
        process.exit(1);
    }

    const tasks=loadtasks();

    const newID=tasks.length>0 ? tasks[tasks.length-1].id+1 : 1;
    const now=new Date().toISOString();

    const newTask={
        id: newID,
        description: description,
        status: "to-do",
        createdAT: now,
        updatedAt: now
    };

    tasks.push(newTask);
    savetasks(tasks);

    console.log(`Task added successfullt(ID : ${newID})`);
}
else if(command==='list')
{
    const tasks=loadtasks();
    if(tasks.length===0)
    {
        console.log('No tasks found');
    }
    else if(args[1]==="done" || args[1]==="todo" || args[1]==="in-progress")
    {
        const cmd=args[1];
        reorder(tasks);
        tasks.forEach(task=>{
            if(task.status===cmd)
            {  
                console.log(`${task.id} ${task.description}`);
                cmd=0;
            }
        });
        if(cmd!=0)
            console.log("No element with such status found");
    }
    else
    {
        reorder(tasks);
        tasks.forEach(task=>{
            console.log(`[${task.id} ${task.description} - Status : ${task.status}]`);
        });
    }
}
else if(command==="update")
{
    const tasks=loadtasks();
    if(tasks.length===0)
    {
        console.log('No tasks found');
    }
    else
    {
        const task=tasks.find(task=> task.id==args[1]);
        if(!task)
            console.log("Task not found");

        else
        {
            task.descriptiom=args[2];
            savetasks(tasks);
            console.log('task updated');
        }
    }
}
else if(command==='delete')
{
    const tasks=loadtasks();
    if(tasks.length===0)
    {
        console.log('No tasks found');
    }
    else
    {
        const newtasks=tasks.filter(task=> task.id!=(args[1]-1));
        reorder(newtasks);
        if(tasks.length===newtasks.length)
            console.log('No tasks with such id found');
        else
        {
            savetasks(newtasks);
            console.log('Task deleted');
        }
    }
}
else if(command==="mark-in-progress"  || command==='mark-done')
{
    const tasks=loadtasks();
    if(tasks.length===0)
    {
        console.log('No tasks found');
    }
    else
    {
        tasks.forEach(task=>{
            if(task.id==args[1])
            {
                task.status=args[0];
            }
        });
        const task=tasks.find(task=> task.id==args[1]);
        if(!task)
            console.log('No such task exists');
        else
        {
            task.status=args[0];
            savetasks(tasks);
            console.log('Task status updated')
        }
    }
}