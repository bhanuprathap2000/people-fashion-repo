import { firestore } from './../../firebase/utils';


/*
This helper function will return a promise and here we are trying to add the product to the firestore
first we target the collection and call .doc() will create a new doc and setting that doc value to the 
value passed from frontend which we will in the modal popup which comes on click of add new product

*/
export const handleAddProduct = product => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}

/*
hadlefetchproducts will be reposnsibe for fetching the documents
This accepts the filterType, startAfterDoc, persistProducts=[]
filterType is either men or women to filter out those
startAfterDoc is the last document in the group of six as here we are fetching 6 products perpage
persistProducts is the array containing the documents before fetching the new documents

So in the firebase the paganation works like this we have to send the last document from which onwards we need the 
next data so that's why we are sending that in the query doc
This will return the promise 
inside first we create a reference to the documents in the collection and order it and limit them as 6 perpage
if filtertype passed then add the additional query and return back the refrence
if startAfterDoc ->there is a method startAfter to which we need to pass the last accessed documents if need

now since we got the refrence we can actually call the get and handle the data 
so here we get the total number of documents
we create a array in which we spread any previous documents and new documents

so after this we now call reosolve with the new data and last document reference and a bollean value isLastpage
to indicate whether we have finished fethcing all the documents.

*/

export const handleFetchProducts = ({ filterType, startAfterDoc, persistProducts=[] }) => {
  return new Promise((resolve, reject) => {
    const pageSize = 6;

    let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

    if (filterType) ref = ref.where('productCategory', '==', filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    ref
      .get()
      .then(snapshot => {
        const totalCount = snapshot.size;

        const data = [
          ...persistProducts,
          ...snapshot.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1
        });
      })
      .catch(err => {
        reject(err);
      })
  })
}


/*

This helper will return a promise 

we first get the reference to the that by passing the document id coming from click of delete button and call he delete method and then if completed 
then we will resolve.

*/

export const handleDeleteProduct = documentID => {
  console.log(documentID, 1)
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(documentID)
      .delete()
      .then(() => {
        console.log(documentID, 2)
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}