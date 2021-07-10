import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookAct } from '../../Redux/actions/books/BA';
import Loading from '../Loading/Loading';

const Books = () => {
  const dispatch = useDispatch();

  
  useEffect(() => {
    //dispatch action
    dispatch(fetchBookAct());
  }, [dispatch]);

  //GRAB THE DATA FROM OUR STORE
  const { loading, bookList } = useSelector(state => {
    return state.booksFetched;
  });
//   console.log(books);
  console.log(loading);
const books=bookList;
  return (
    <div>
      <div className='row'>
        <div className='col'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>Author</th>
                <th scope='col'>Book Name</th>
                <th scope='col'>Category</th>

              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loading />
              ) : (
                <>
                  {books &&
                    books.map(book => {
                      return (
                        <>
                          {/* Map through here */}
                          <tr className='table-dark'>
                            <th className="text-success " scope='row'>{book.title}</th>
                            <td className ="text-success">{book.author}</td>
                            <td className ="text-success">{book.category}</td>
                          </tr>
                          {/* End of map thr */}
                        </>
                      );
                    })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { Books };