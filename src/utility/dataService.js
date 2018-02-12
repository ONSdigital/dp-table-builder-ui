import http from './http';

const responseJson = 'json';
const responseBlob = 'blob';

export default class DataService {

   
   

    static tablepostPreview(body,uri) {
        return http.post(uri,body,true,false,responseJson)
            .then(response => {
                return response;
            })
    }


    // renders as xls, csv for downloading - responseformat is blob
    static tableRenderFilePreview(body,uri,fileType) {
        return http.post(uri,body,true,false,responseBlob)
            .then(response => {
                return response;
            })
    }



    // Save table TO DO - not implemented here
    static tableSaveFilePreview(body,fileType) {
        return http.post(`http://localhost:23300/save/${fileType}`,body,true,false,responseJson)
            .then(response => {
                return response;
            })
    }





    // static get(collectionID) {
    //     return http.get(`/zebedee/collectionDetails/${collectionID}`)
    //         .then(response => {
    //             return response;
    //         })
    // }
    
    // static getAll() {
    //     return http.get(`/zebedee/collections`)
    //         .then(response => {
    //             return response;
    //         })
    // }

    // static create(body) {
    //     return http.post(`/zebedee/collection`, body)
    //         .then(response => {
    //             return response;
    //         })
    // }

    // static approve(collectionID) {
    //     return http.post(`/zebedee/approve/${collectionID}`);
    // }

    // static delete(collectionID) {
    //     return http.delete(`/zebedee/collection/${collectionID}`);
    // }

    // static update(collectionID, body) {
    //     body.id = collectionID;
    //     return http.put(`/zebedee/collection/${collectionID}`, body);
    // }

    // static deletePage(collectionID, pageURI) {
    //     return http.delete(`/zebedee/content/${collectionID}?uri=${pageURI}`);
    // }

    // static cancelDelete(collectionID, pageURI) {
    //     return http.delete(`/zebedee/DeleteContent/${collectionID}?uri=${pageURI}`);
    // }

}