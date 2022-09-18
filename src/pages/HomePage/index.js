import {Button, Col, Container, Dropdown, DropdownButton, Form, Modal, Row, Spinner} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {TodoItem} from '../../components/TodoItem';
import './index.scss'
import {toast, ToastContainer} from "react-toastify";

const dropdownItemList = [
    {text: 'All', id: '1'},
    {text: 'Todo', id: '2'},
    {text: 'Done', id: '3'},
]

export function HomePage() {
    const [todoList, setTodoList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedTodoId, setEditedTodoId] = useState(null);
    const [deletedTodoId, setDeletedTodoId] = useState(null);
    const [dropdownSelectedValueId, setDropdownSelectedValueId] = useState('2');
    const [modalContent, setModalContent] = useState('');
    const [loaderHidden, setLoaderHidden] = useState(true);

    useEffect(() => {
        getTodoList();
    }, [])

    const getTodoList = () => {
        setLoaderHidden(false);
        fetch(`${process.env.REACT_APP_BASE_URL}/todos`,
            {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                }
            }).then((response) => {
            response.json().then((body) => {
                setTodoList(body);
            })
        }).catch(() => {
            toast.error('Something went wrong when getting todo list', {
                position: 'bottom-right'
            })
        }).finally(() => {
            setLoaderHidden(true);
        })
    }

    const deleteTodo = () => {
        setLoaderHidden(false);
        handleCloseWarningModal();
        fetch(`${process.env.REACT_APP_BASE_URL}/todos/${deletedTodoId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                }
            }
        ).then(() => {
                getTodoList();
                toast.success('Deleted todo.', {
                    position: 'top-center'
                })
            }
        ).catch(() => {
            toast.error('Failed to delete todo.', {
                position: 'top-center'
            })
        }).finally(() => {
            setLoaderHidden(true);
        })
    }

    const doneTodo = (id) => {
        setLoaderHidden(false);
        fetch(`${process.env.REACT_APP_BASE_URL}/todos/${id}`, {
                method: 'PUT',
                body: JSON.stringify({isCompleted: true}),
                headers: {
                    'content-type': 'application/json',
                }
            }
        ).then(() => {
                getTodoList();
                toast.success('Updated todo.', {
                    position: 'top-center'
                })
            }
        ).catch(() => {
            toast.error('Failed to update todo.', {
                position: 'top-center'
            })
        }).finally(() => {
            setLoaderHidden(true);
        })
    }

    const reAddTodo = (id) => {
        setLoaderHidden(false);
        fetch(`${process.env.REACT_APP_BASE_URL}/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({isCompleted: false}),
            headers: {
                'content-type': 'application/json',
            }
        }).then(() => {
            getTodoList();
            toast.success('Updated todo.', {
                position: 'top-center'
            })
        }).catch(() => {
            toast.error('Failed to update todo.', {
                position: 'top-center'
            })
        }).finally(() => {
            setLoaderHidden(true);
        })
    }


    const saveTodo = () => {
        setLoaderHidden(false);
        if (editMode) {
            fetch(`${process.env.REACT_APP_BASE_URL}/todos/${editedTodoId}`, {
                    method: 'PUT',
                    body: JSON.stringify({content: modalContent}),
                    headers: {
                        'content-type': 'application/json',
                    }
                }
            ).then(() => {
                    getTodoList();
                    handleCloseModal();
                    toast.success('Updated todo.', {
                        position: 'top-center'
                    })
                }
            ).catch(() => {
                toast.error('Failed to update todo.', {
                    position: 'top-center'
                })
            }).finally(() => {
                setLoaderHidden(true);
            })
        } else {
            fetch(`${process.env.REACT_APP_BASE_URL}/todos`, {
                    method: 'POST',
                    body: JSON.stringify({content: modalContent}),
                    headers: {
                        'content-type': 'application/json',
                    }
                }
            ).then(() => {
                    getTodoList();
                    handleCloseModal();
                    toast.success('Added new todo!', {
                        position: 'top-center'
                    })
                }
            ).catch(() => {
                toast.error('Failed to add new todo.', {
                    position: 'top-center'
                })
            }).finally(() => {
                setLoaderHidden(true);
            })
        }
    }

    const handleCloseModal = () => {
        setModalContent('');
        setShowModal(false);
    }
    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseWarningModal = () => {
        setShowDeleteItemModal(false);
    }

    const handleShowWarningModal = () => {
        setShowDeleteItemModal(true);
    }

    const onDeleteTodoClick = (id) => {
        setDeletedTodoId(id);
        handleShowWarningModal();
    }

    const onTodoEditClick = (id, content) => {
        setEditedTodoId(id);
        setModalContent(content);
        setEditMode(true);
        handleShowModal();
    }

    const onNewAddClick = () => {
        setEditMode(false);
        handleShowModal();
    }

    return (
        <>
            <Container fluid className='vh-100 d-flex flex-column position-relative p-0'>
                <Row className='py-5 d-flex justify-content-center'>
                    <Col lg={6} md={8} xs={10} className='d-flex justify-content-end'>
                        <DropdownButton
                            title={`Show ${dropdownItemList.find(it => it.id === dropdownSelectedValueId)?.text}`}
                            onSelect={(e) => setDropdownSelectedValueId(e)}>
                            {
                                dropdownItemList.map((item) => (
                                    <Dropdown.Item key={item.id} active={dropdownSelectedValueId === item.id}
                                                   eventKey={item.id}>{item.text}</Dropdown.Item>
                                ))
                            }
                        </DropdownButton>
                        <Button className='bg-primary ms-2' onClick={() => onNewAddClick()}>Add New</Button>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                    <Col lg={6} md={8} xs={10}>
                        {
                            dropdownSelectedValueId === dropdownItemList[0].id ?
                                todoList.map((listItem) => (
                                    <TodoItem key={listItem.id} deleteTodo={() => onDeleteTodoClick(listItem.id)}
                                              editTodo={() => onTodoEditClick(listItem.id, listItem.content)}
                                              doneTodo={() => doneTodo(listItem.id)}
                                              reAddTodo={() => reAddTodo(listItem.id)}
                                              todo={listItem}/>
                                )) :
                                dropdownSelectedValueId === dropdownItemList[1].id ?
                                    todoList.filter(t => !t.isCompleted).map((listItem) => (
                                        <TodoItem key={listItem.id} deleteTodo={() => onDeleteTodoClick(listItem.id)}
                                                  editTodo={() => onTodoEditClick(listItem.id, listItem.content)}
                                                  doneTodo={() => doneTodo(listItem.id)}
                                                  todo={listItem}/>
                                    )) :
                                    dropdownSelectedValueId === dropdownItemList[2].id ?
                                        todoList.filter(t => t.isCompleted).map((listItem) => (
                                            <TodoItem key={listItem.id}
                                                      deleteTodo={() => onDeleteTodoClick(listItem.id)}
                                                      reAddTodo={() => reAddTodo(listItem.id)}
                                                      todo={listItem}/>
                                        )) : null
                        }
                    </Col>
                </Row>
                <ToastContainer/>
                <div
                    className={`vh-100 w-100 ${loaderHidden ? 'visually-hidden' : 'visible'} d-flex position-absolute justify-content-center align-items-center bg-white opacity-75`}>
                    <Spinner className='bg-white' animation='border' role='status'/>
                </div>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header>
                        <Modal.Title>
                            {
                                editMode ? 'Edit Todo' : 'Add New'
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Control as='textarea' placeholder='...'
                                          onChange={(e) => setModalContent(e.target.value)}
                                          value={modalContent} autoFocus/>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button disabled={modalContent.length < 3} variant='primary' onClick={() => saveTodo()}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showDeleteItemModal} onHide={handleCloseWarningModal}>
                    <Modal.Header>
                        <Modal.Title>
                            Delete
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>This item will be deleted. Are you sure?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleCloseWarningModal}>
                            No
                        </Button>
                        <Button variant='primary' onClick={() => deleteTodo()}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}
