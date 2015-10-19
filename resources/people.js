
module.exports = {
    namespace: "people",
    entityTypes:{
        "PersonType": {
            "_id": {"type": "Edm.String", key: true},
            "firstName": {"type": "Edm.String"},
            "lastName": {"type": "Edm.String"},
            "birtDate": {"type": "Edm.Date"}
        }
        
    },
    entitySets:{
        "people": {
            entityType: "people.PersonType"
        }
    }
};