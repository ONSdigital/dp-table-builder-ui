import http from './http';

export default class DataService {

   

    static tablepostPreview(body) {
        return http.post('http://localhost:23300/parse/html',body,true,false,'json')
            .then(response => {
                return response;
            })
    }


// renders as xls, csv for downloading - responseformat is blob
    static tableRenderFilePreview(body,fileType) {
        return http.post(`http://localhost:23300/render/${fileType}`,body,true,false,'blob')
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