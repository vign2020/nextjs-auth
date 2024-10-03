export const SQL_QUERY = {
    USER: {
        GET_MANY: `empModel.findAll({include:[{model:deptModel}]})
    .then(function(data){
        res.json({da:data});
    }).catch(function(error){
        res.json({er:error});
    })
`
        
    }
}as const;

