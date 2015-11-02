
module.exports = {
    namespace: "ch.soinwi.rltool",
    entityTypes:{
        "PersonType": {
            "_id": {"type": "Edm.String", key: true, "Nullable": false},
            "firstName": {"type": "Edm.String"},
            "lastName": {"type": "Edm.String"},
            "birtDate": {"type": "Edm.Date"}
        }
        
    },
    entitySets:{
        "people": {
            entityType: "ch.soinwi.rltool.PersonType"
        }
    }
};