import React from 'react';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import QuestionaryModalStore from '../store/questionaryModal.store';
import QuestionaryModalViewStore from '../store/questionaryModal.view.store';
import Gallery from '../../../../_components/UI/gallery/Gallery';
import SlideUpModal from '../../../../_components/UI/modals/SlideUpModal';

const QuestionaryGallery = (observer(() => {
    const questionaryModalStore = useInstance(QuestionaryModalStore)
    const questionaryModalViewStore = useInstance(QuestionaryModalViewStore)
    const galleryImgs = questionaryModalStore.getQuestionaries()?.map((item, index) => {
        return {
            imageLink: item.fileLink,
            rotation: 0,
            order: index,
            title: ""
        }
    }) || []

    const handleClose = () => {
        questionaryModalViewStore.setOpenGallery(false)
        questionaryModalStore.setQuestionaryGalleryIndex(null)
    }

    return (
        <SlideUpModal
            open={questionaryModalViewStore.getOpenGallery()}
            title={"Опросники"}
            isBtnSave={false}
            closeClick={handleClose}
        >
            {galleryImgs?.length > 0 && (questionaryModalStore.getQuestionaryGalleryIndex() || questionaryModalStore.getQuestionaryGalleryIndex()===0) &&
                <Gallery data={galleryImgs} startIndex={questionaryModalStore.getQuestionaryGalleryIndex()} />
            }
        </SlideUpModal>
    );
}));

export default QuestionaryGallery;