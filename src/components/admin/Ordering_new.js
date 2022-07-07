import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import useStore from "../../store/useStore";
import { getApiUrl } from "../../utils/helpers";
import "./ordering.css";

const Ordering = () => {
  const [isOrderingGroups, setIsOrderingGroups] = useState(true);
  const [translations, setTranslations] = useState([]);
  const [questionsGroups, setQuestionsGroups] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(null);
  // const isModalOpen = useStore((state) => state.isModalOpen);
  // const setIsModalOpen = useStore((state) => state.setIsModalOpen);

  useEffect(() => {
    fetchGroups();
    fetchTranslations();
  }, []);

  // fetching groups
  async function fetchGroups() {
    try {
      const response = await fetch(`${getApiUrl()}/assessments/questionGroupTree/1`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
      }
      const groups = await response.json();
      groups.sort((a, b) => a.QUESTION_GROUP_ORDER - b.QUESTION_GROUP_ORDER);
      groups.map((group) => group.ASSESSMENTS_QUESTIONS.sort((a, b) => a.QUESTION_ORDER - b.QUESTION_ORDER));
      setQuestionsGroups(groups);
    } catch (err) {
      console.log(err);
    }
  }

  // Fetching translations
  async function fetchTranslations() {
    try {
      const response = await fetch(`${getApiUrl()}/assessments/translations`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      const translations = await response.json();
      setTranslations(translations);
    } catch (err) {
      console.log(err);
    }
  }

  // Update groups order request ( save button )
  const updateGroupsOrder = async () => {
    const groupsJson = JSON.stringify(questionsGroups);
    const groups = JSON.parse(groupsJson);
    const response = await fetch(`${getApiUrl()}/assessments/add-new-version`, {
      method: "POST",
      body: JSON.stringify(groups),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(await response.json());
    response.ok && setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

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

  const saveButtonText = <>{isSaved ? <span>Változások elmentve ✓</span> : <span>Mentés</span>}</>;

  return (
    <section>
      <div className="container">
        <button className="button is-primary-darker m-4" onClick={() => updateGroupsOrder()}>
          {saveButtonText}
        </button>
        {translations && questionsGroups ? (
          isOrderingGroups ? (
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
                                <button className="button is-primary-darker" onClick={() => onQuestionsOrdering(index)}>
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
                    {questionsGroups[currentGroupIndex].ASSESSMENTS_QUESTIONS.map(({ QUESTION_ORDER, CODE }, index) => {
                      return (
                        <Draggable key={QUESTION_ORDER} draggableId={QUESTION_ORDER.toString()} index={index}>
                          {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <p>{translations.find((translation) => translation.CODE === CODE)?.TRANSLATION}</p>
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
          )
        ) : null}
      </div>
    </section>
  );
};

export default Ordering;
