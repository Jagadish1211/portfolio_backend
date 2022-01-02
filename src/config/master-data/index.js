const projectInteractionsData = require('./project-interactions');
const ProjectInteractions = require('../../models/project-interactions');

module.exports = async ()=>{
    console.log("Initialized called for db changes");

    projectInteractionsData.forEach(async (p)=>{
        let projectInteraction = await ProjectInteractions.findOne({project: p.project});
        if(!projectInteraction){
            projectInteraction = new ProjectInteractions({
                project: p.project,
            })
            await projectInteraction.save();
        }
        console.log(`For ${p.project}: `,projectInteraction);
    })

}