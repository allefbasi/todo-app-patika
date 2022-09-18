import {Button, Row, Col, ListGroup} from 'react-bootstrap';
import {
    ArrowClockwise,
    Check2,
    CheckCircleFill,
    Pencil,
    PinAngleFill,
    Trash
} from 'react-bootstrap-icons';
import {useState} from "react";
import './index.scss';

export function TodoItem(props) {
    const todo = props.todo;
    const deleteTodo = props.deleteTodo;
    const editTodo = props.editTodo;
    const doneTodo = props.doneTodo;
    const reAddTodo = props.reAddTodo;
    const [mouseOver, setMouseOver] = useState(false);

    const onMouseOverFunction = () => {
        setMouseOver(true);
    }

    const onMouseOutFunction = () => {
        setMouseOver(false);
    }

    return (
        <Row className='mb-4'>
            <Col
                className={`todo-container bg-light border-${todo.isCompleted ? 'success' : 'primary'} border border-2 rounded`}
                onMouseOver={() => onMouseOverFunction()}
                onMouseOut={() => onMouseOutFunction()}>
                <div className='icon-div d-flex float-end bg-white justify-content-center'>
                    {
                        todo.isCompleted ?
                            <CheckCircleFill size={18} className='text-success'/> :
                            <PinAngleFill size={20} className='text-primary'/>

                    }
                </div>
                <div className='h-100 d-flex justify-content-between align-items-center'>
                    <div className={`${todo.isCompleted ? 'opacity-50' : 'opacity-100'} todo-div`}>
                        {todo.content}
                    </div>
                    <div>
                        {
                            mouseOver ?
                                <ListGroup horizontal>
                                    <ListGroup.Item className='border-0'>
                                        <Button hidden={todo.isCompleted} onClick={doneTodo}>
                                            <Check2 size={13}/>
                                        </Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='border-0'>
                                        <Button hidden={todo.isCompleted} onClick={editTodo}>
                                            <Pencil size={13}/>
                                        </Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='border-0'>
                                        <Button hidden={!todo.isCompleted} onClick={reAddTodo}>
                                            <ArrowClockwise size={13}/>
                                        </Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='border-0'>
                                        <Button onClick={deleteTodo}>
                                            <Trash size={13}/>
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup> :
                                null
                        }
                    </div>
                </div>
            </Col>
        </Row>
    )
}
