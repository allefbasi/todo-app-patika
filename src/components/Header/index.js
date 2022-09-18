import {Button, Col, Container, Modal, Navbar, Row} from 'react-bootstrap';
import {PinAngleFill} from 'react-bootstrap-icons';
import {useState} from 'react';
import './index.scss';

export function Header() {
    const [showModal, setShowModal] = useState(false);
    const username = localStorage.getItem('username');

    const onLogoutClick = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const logout = () => {
        localStorage.removeItem('username');
        window.location.reload();
    }

    return (
        <Navbar bg='primary' expand='lg' className='text-light'>
            <Container fluid>
                <Row className='w-100'>
                    <Col lg={9} xs={6}>
                        <Navbar.Brand className='d-flex align-items-center ms-5 text-light'>
                            <PinAngleFill size={25} className='me-2'/>
                            To-Do App
                        </Navbar.Brand>
                    </Col>
                    <Col lg={3} xs={6} className='d-flex justify-content-end'>
                        {
                            username ?
                                <>
                                    <span className='d-flex align-items-center'>
                                        Welcome, {username}
                                    </span>
                                    <button onClick={() => onLogoutClick()}
                                            className='bg-transparent border-0 border-start border-light text-light ms-3 ps-3'>
                                        Logout
                                    </button>
                                </>
                                :
                                null
                        }
                    </Col>
                </Row>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header>
                        <Modal.Title>
                            Logout
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you want to logout?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleCloseModal}>
                            No
                        </Button>
                        <Button variant='primary' onClick={() => logout()}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Navbar>

    )
}
