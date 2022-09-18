import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import {useState} from 'react';
import './index.scss'

export function LoginPage() {
    const [username, setUsername] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('username', username);
        window.location.reload();
    }
    return (
        <Container fluid className='vh-100'>
            <Row className='h-100'>
                <Col className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='login-div'>
                        <h2 className='text-primary pb-3 text-center'>Login</h2>
                        <Card className='text-center w-100'>
                            <Card.Body>
                                <Form onSubmit={(e) => onSubmit(e)}>
                                    <Form.Control className={'mb-3'} placeholder='Username' value={username}
                                                  onChange={(e) => setUsername(e.target.value)} required/>
                                    <Button className='w-100' variant='primary' type='submit'>Sign In</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
