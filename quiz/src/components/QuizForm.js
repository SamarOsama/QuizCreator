import { useState } from "react";
import { Button, Col, Container, Row } from 'react-bootstrap'

export const QuizForm = ({ quiz, onSaveQuiz }) => {
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState(quiz.title);
    const [description, setDescription] = useState(quiz.description);
    const [videoUrl, setVideoUrl] = useState(quiz.url);
    const [questions, setQuestions] = useState(quiz.questions_answers);
    const [person, setPerson] = useState({ name: "test" })
    const handleNext = (e) => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };
    const handleSave = () => {
        const updatedQuiz = {
            ...quiz,
            title,
            description,
            url: videoUrl,
            questions_answers: questions
        };
        onSaveQuiz(updatedQuiz);

    };

    const handleAddQuestion = (e) => {
        e.preventDefault()
        const newQuestion = {
            id: null,
            text: '',
            answers: [{}],
            feedback_true: '',
            feedback_false: '',
            answer_id: null
        };
        setQuestions([...questions, newQuestion]);
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answers[answerIndex][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleAddAnswer = (questionIndex) => {
        const updatedQuestions = [...questions];
        const biggestAnswerId = Math.max(...updatedQuestions[questionIndex].answers.map(answer => Number(answer.id)));
        updatedQuestions[questionIndex].answers.push(
            {
                id: Number(biggestAnswerId + 1),
                is_true: false,
                text: `question ${biggestAnswerId} answer ${biggestAnswerId} false`
            }
        );
        setQuestions(updatedQuestions);
    }

    return (
        <Container>

            <Row>
                <Col md={6}>
                    <h2>{quiz.id ? 'Edit Quiz' : 'Create Quiz'}</h2>
                    <form>
                        {step === 1 && (
                            <div className="form-group" controlId="formStep1">
                                <div className="row">
                                    <label className="form-label">
                                        Title:
                                        <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </label>
                                </div>

                                <div className="row">
                                    <label className="form-label">
                                        Description:
                                        <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </label>
                                </div>
                                <div className="row">
                                    <label className="form-label">
                                        Video URL:
                                        <input className="form-control" type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
                                    </label>
                                </div>
                            </div>
                        )}
                        {step === 2 &&
                            questions.map((question, index) => (
                                <div key={index}>
                                    <h3>Question {index + 1}</h3>
                                    <div className="row">
                                        <label className="form-label">
                                            Question Text:
                                            <input
                                                type="text"
                                                value={question.text}
                                                className="form-control"
                                                onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <div className="row">
                                        <label className="form-label">
                                            Feedback (True):
                                            <input
                                                type="text"
                                                value={question.feedback_true}
                                                className="form-control"
                                                onChange={(e) => handleQuestionChange(index, 'feedback_true', e.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <label className="form-label">
                                            Feedback (False):
                                            <input
                                                type="text"
                                                value={question.feedback_false}
                                                className="form-control"
                                                onChange={(e) => handleQuestionChange(index, 'feedback_false', e.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <h4>Answer of Question {index + 1}</h4>
                                    {question.answers.map((answer, answerIndex) => (
                                        <div key={answer.id}>
                                            <div className="row">
                                                <label className="form-label">
                                                    Answer Text:
                                                    <input
                                                        type="text"
                                                        value={answer.text}
                                                        className="form-control"
                                                        onChange={(e) =>
                                                            handleAnswerChange(index, answerIndex, 'text', e.target.value)
                                                        }
                                                    />
                                                </label>
                                            </div>
                                            <label>
                                                Is Correct:
                                                <input
                                                    type="checkbox"
                                                    checked={answer.is_true}
                                                    onChange={(e) =>
                                                        handleAnswerChange(index, answerIndex, 'is_true', e.target.checked)
                                                    }
                                                />
                                            </label>
                                            <br />

                                        </div>

                                    ))}
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div role="button" className="btn btn-info" onClick={() => handleAddAnswer(index)}>
                                                Create new answer
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        <div className="row">
                            {/* <div className="col-md-4">
                                <button className="btn btn-primary w-100" onClick={handleAddQuestion}>Add Question</button>
                            </div> */}

                            <div className="d-flex justify-content-between">
                                {step > 1 && (
                                    <Button variant="secondary" onClick={handlePrevious}>
                                        Previous
                                    </Button>
                                )}
                                {step < 2 ? (
                                    <>
                                        <Button variant="primary" onClick={handleNext}>
                                            Next
                                        </Button>
                                        <Button variant="primary" onClick={
                                            (e) => { handleAddQuestion(e); handleNext() }
                                        }>
                                            Add Question
                                        </Button>
                                    </>
                                ) : (
                                    <Button variant="primary" type="button" onClick={handleSave}>
                                        Submit
                                    </Button>
                                )}
                            </div>
                        </div>

                    </form>
                </Col>

            </Row>

        </Container >
    );
};
