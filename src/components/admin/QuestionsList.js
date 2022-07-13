import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./ordering.css";

const QuestionsList = ({ translations, questionsGroups, setQuestionsGroups }) => {
  const [isOrderingGroups, setIsOrderingGroups] = useState(true);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(null);

  // On group choosing ( button on each card )
  function onQuestionsOrdering(index) {
    setCurrentGroupIndex(index);
    setIsOrderingGroups(false);
  }

  // on groups ordering ( back button above all the cards)
  function onGroupsOrdering() {
    setCurrentGroupIndex(null);
    setIsOrderingGroups(true);
  }

  function onDrop(result) {
    if (!result.destination) return;
    const items = isOrderingGroups
      ? [...questionsGroups]
      : [...questionsGroups[currentGroupIndex].ASSESSMENTS_QUESTIONS];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    for (let i = 0; i < items.length; i++) {
      isOrderingGroups ? (items[i].QUESTION_GROUP_ORDER = i + 1) : (items[i].QUESTION_ORDER = i + 1);
    }
    // const isertQuestions = () => {
    const qGroupCopy = questionsGroups;
    !isOrderingGroups && (qGroupCopy[currentGroupIndex].ASSESSMENTS_QUESTIONS = items);
    // };
    isOrderingGroups ? setQuestionsGroups(items) : setQuestionsGroups(qGroupCopy);
  }

  return (
    <>
      <section>
        <div className="container">
          {translations &&
            questionsGroups &&
            (isOrderingGroups ? (
              <>
                <DragDropContext onDragEnd={onDrop}>
                  <Droppable droppableId="questionsGroup">
                    {(provided) => (
                      <div className="questionsGroup" {...provided.droppableProps} ref={provided.innerRef}>
                        {questionsGroups.map(({ QUESTION_GROUP_ORDER, CODE }, index) => {
                          return (
                            <Draggable
                              onClick={() => onQuestionsOrdering(index)}
                              key={QUESTION_GROUP_ORDER}
                              draggableId={QUESTION_GROUP_ORDER.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  className="is-flex is-justify-content-space-between"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p>{translations.find((translation) => translation.CODE === CODE)?.TRANSLATION}</p>
                                  <button
                                    className="button is-primary-darker"
                                    onClick={() => onQuestionsOrdering(index)}
                                  >
                                    Csoport szerkesztése
                                  </button>
                                </li>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </>
            ) : (
              <DragDropContext onDragEnd={onDrop}>
                <button className="button is-primary-darker m-4" onClick={onGroupsOrdering}>
                  Vissza
                </button>
                <Droppable droppableId="questionsGroup">
                  {(provided) => (
                    <div className="questionsGroup" {...provided.droppableProps} ref={provided.innerRef}>
                      {questionsGroups[currentGroupIndex].ASSESSMENTS_QUESTIONS.map(
                        ({ QUESTION_ORDER, CODE }, index) => {
                          return (
                            <Draggable key={QUESTION_ORDER} draggableId={QUESTION_ORDER.toString()} index={index}>
                              {(provided) => (
                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <p>{translations.find((translation) => translation.CODE === CODE)?.TRANSLATION}</p>
                                </li>
                              )}
                            </Draggable>
                          );
                        }
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ))}
        </div>
      </section>
    </>
  );
};

export default QuestionsList;
