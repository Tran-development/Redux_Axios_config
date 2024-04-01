import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from "../services/UserService"
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../components/ModalAddNew';
import ModalEditNew from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _ from "lodash"
import { debounce } from 'lodash';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse"
import './TableUsers.scss'
import { toast } from 'react-toastify';

const TableUsers = () => {

  const [listUsers, setListUsers] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  // 
  const [show, setShow] = useState(false)
  const [isShowModalEdit, setIsShowModalEdit] = useState(false)
  const [dataUserEdit, setDataUserEdit] = useState({})
  const [dataUserDelete, setDataUserDelete] = useState({})
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)

  const [sortBy, setSortBy] = useState('')
  const [sortField, setSortField] = useState('')

  const [dataExport, setDataExport] = useState([])

  const handleClose = () => {
    setShow(false)
    setIsShowModalEdit(false)
    setIsShowModalDelete(false)
  }
  const handleShow = () => setShow(true)

  useEffect(() => {
    // call APIs
    getUsers(1)
  }, [])

  const getUsers = async (page) => {
    let res = await fetchAllUser(page)
    if (res && res.data) {
      // console.log(res);
      setTotalUsers(res.total)
      setListUsers(res.data)
      // console.log(res); : include : total, total_pages
      setTotalPages(res.total_pages)
    }
  }
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1)
  }

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers])
  }

  const handleEditUser = (user) => {
    setDataUserEdit(user)
    setIsShowModalEdit(true)
  }

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true)
    // khi mở modal xong thì lưu thông tin user muốn xoá luôn
    setDataUserDelete(user)

  }

  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers)
    let index = listUsers.findIndex(item => item.id === user.id)
    cloneListUser[index].first_name = user.first_name

    setListUsers(cloneListUser)
  }

  const handleDeleteUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers)
    cloneListUser = cloneListUser.filter(item => item.id !== user.id)
    setListUsers(cloneListUser)
  }

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy)
    setSortField(sortField)

    let cloneListUser = _.cloneDeep(listUsers)
    // lodash lib = ['type', 'name']
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy])
    setListUsers(cloneListUser)
  }

  const handleSearch = debounce((e) => {
    let term = e.target.value
    if (term) {
      let cloneListUser = _.cloneDeep(listUsers)
      cloneListUser = cloneListUser.filter(item => item.email.includes(term))
      setListUsers(cloneListUser)
    } else {
      getUsers(1)
    }
  }, 500)

  // ham sd lai cua thu vien
  const handleExport = (event, done) => {
    let result = []
    if (listUsers && listUsers.length > 0) {
      result.push(["Id", "Email", "First name", "Last name"])
      listUsers.map((item, index) => {
        let arr = []
        arr[0] = item.id
        arr[1] = item.email
        arr[2] = item.first_name
        arr[3] = item.last_name
        result.push(arr)
      })
      setDataExport(result)
      done()
    }
  }

  const handleImportCSV = (e) => {
    // Parse local CSV file
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0]
// validate sang format csv *size thi file.size
      if (file.type !== 'text/csv') {
        toast.error('Only accept csv file...')
        return
      }
// covert csv de lay ra data
      Papa.parse(file, {
        // header: true
        complete: function (results) {
          let rawCSV = results.data
          if (rawCSV.length > 0) {
            // check format
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (rawCSV[0][0] !== 'email' || 
              rawCSV[0][1] !== 'first_name' || 
              rawCSV[0][2] !== 'last_name'
              ) {
                toast.error('wrong format header CSV file !')
              } else {
                let result = []

                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {}
                    obj.email = item[0]
                    obj.first_name = item[1]
                    obj.last_name = item[2]
                    result.push(obj)
                  }
                })
                // fill data vao table
                setListUsers(result)
                console.log(">> check result: ", result);
              }
            } else {
              toast.error('wrong format CSV file !')
            }
          } else {
            toast.error('not found data oncsv file!')
          }
        }
      })
    }
  }

  return (
    <>
      <div className="my-3 add-new d-sm-flex">
        <span>List Users:</span>
        <div className='group-btns mt-sm-0 mt-2'>
          <label htmlFor='uploadcsv' className='btn btn-warning'><i className='fa-solid fa-file-arrow-up'></i> Import</label>
          <input
            type='file'
            id='uploadcsv'
            hidden
            onChange={(e) => handleImportCSV(e)}
          />
          <CSVLink
            data={dataExport}
            filename={"users.csv"}
            className="btn btn-success"
            asyncOnClick={true}
            // tham chiếu ts hàm handleExport
            onClick={handleExport}
          > <i className='fa-solid fa-file-arrow-down'></i> Export</CSVLink>
          <button
            className="btn btn-primary"
            onClick={handleShow}
          >
            <i className='fa-solid fa-circle-plus'></i>  Add new</button>
        </div>
      </div >
      <div className='col-12 col-sm-4 my-3'>
        <input
          className='form-control'
          placeholder='Search user by email...'
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className='customize-table'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th >
              <div className='sort-header'>
                <span>ID</span>
                <span>
                  <i
                    onClick={() => handleSort('desc', 'id')}
                    className="fa-solid fa-arrow-down-long"
                  >
                  </i>
                  <i
                    onClick={() => handleSort('asc', 'id')}
                    className="fa-solid fa-arrow-up-long"
                  >
                  </i>
                </span>
              </div>
            </th>
            <th>
              <div className='sort-header'>
                <span>Email</span>
                <span>
                  <i
                    onClick={() => handleSort('desc', 'email')}
                    className="fa-solid fa-arrow-down-long"
                  >
                  </i>
                  <i
                    onClick={() => handleSort('asc', 'email')}
                    className="fa-solid fa-arrow-up-long"
                  >
                  </i>
                </span>
              </div>
            </th>
            <th>
              <div className='sort-header'>
                <span>First Name</span>
                <span>
                  <i
                    onClick={() => handleSort('desc', 'first_name')}
                    className="fa-solid fa-arrow-down-long"
                  >
                  </i>
                  <i
                    onClick={() => handleSort('asc', 'first_name')}
                    className="fa-solid fa-arrow-up-long"
                  >
                  </i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td className='flex align-content-center'>
                    <button
                      className='btn btn-warning mx-3'
                      onClick={() => handleEditUser(user)}
                    >Edit</button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className='btn btn-danger mt-sm-0 mt-1'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}

        </tbody>
      </Table>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"

        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
      />
      <ModalAddNew
        show={show}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditNew
        show={isShowModalEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  )
}

export default TableUsers