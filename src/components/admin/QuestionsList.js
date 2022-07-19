import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ModalContentQuestionEdit from "../modal/ModalContentQuestionEdit";
import Modal from "../modal/Modal";
import "./ordering.css";

const QuestionsList = ({ translations, questions, setQuestions }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function onDrop(result) {
    if (!result.destination) return;
    const items = [...questions];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    for (let i = 0; i < items.length; i++) {
      items[i].QUESTION_ORDER = i + 1;
    }
    setQuestions(items);
  }

  const handleEditClick = (questionCode) => {
    const question = questions.find((q) => q.CODE === questionCode);
    setSelectedQuestion(question);
    setIsOpen(true);
  };

  const handleDeleteClick = () => {};

  return (
    <section>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <ModalContentQuestionEdit
          setIsOpen={setIsOpen}
          selectedQuestion={selectedQuestion}
          translations={translations}
        />
      </Modal>
      <div className="container is-flex is-justify-content-center">
        <DragDropContext onDragEnd={onDrop}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div className="questions" {...provided.droppableProps} ref={provided.innerRef}>
                {questions.map(({ CODE, ASSESSMENT_GROUP }, index) => {
                  return (
                    <Draggable key={CODE} draggableId={CODE} index={index}>
                      {(provided) => (
                        <li
                          className=""
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <p>
                            {translations.find((translation) => translation.CODE === CODE)?.TRANSLATION} /{" "}
                            <span className="is-size-7 is-italic has-text-weight-normal">
                              {
                                translations.find((translation) => translation.CODE === ASSESSMENT_GROUP.CODE)
                                  ?.TRANSLATION
                              }
                            </span>
                          </p>
                          <div className="field has-addons is-right">
                            <p className="control">
                              <button
                                className="button"
                                onClick={handleDeleteClick}
                                style={{ border: "none", backgroundColor: "transparent" }}
                              >
                                <span className="icon is-small">
                                  <i className="fa fa-trash has-text-danger"></i>
                                </span>
                              </button>
                            </p>
                            <p className="control">
                              <button
                                className="button"
                                onClick={()=>handleEditClick(CODE)}
                                style={{ border: "none", backgroundColor: "transparent" }}
                              >
                                <span className="icon is-small">
                                  <i className="fa fa-pencil-square-o"></i>
                                </span>
                              </button>
                            </p>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                <span className="is-invisible">{provided.placeholder}</span>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </section>
  );
};

export default QuestionsList;
