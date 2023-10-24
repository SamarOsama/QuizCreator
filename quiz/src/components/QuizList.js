import React, { useState } from 'react';
import { Badge, Button, Col, Container, ListGroup, Row } from 'react-bootstrap';

function QuizList({ quizzes, onAddQuiz, onEditQuiz, onAddQuestion }) {
    return (
        <Container>

            <div className='d-flex my-4 justify-content-between'>

                <h3>Quizzies List</h3>

                <div>
                    <Button className='primary' onClick={onAddQuiz}>+</Button>
                </div>
            </div>
            <Row>
                <Col md={12}>
                    <ListGroup as="ol" numbered>
                        {quizzes.map((quiz) => (
                            <ListGroup.Item
                                as="li"
                                key={quiz.id}
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{quiz.title}</div>
                                    {quiz.description}                        </div>

                                <Badge bg="warning" className='mx-2' pill>
                                    {quiz.score}
                                </Badge>
                                <Badge bg="success" className='mx-2' onClick={() => onEditQuiz(quiz)} pill role="button">
                                    Edit Quiz
                                </Badge>
                                <Badge bg="danger" className='mx-2' onClick={() => onAddQuestion(quiz)} pill role="button">
                                    Add Question
                                </Badge>

                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

        </Container>
    )
}

export default QuizList
