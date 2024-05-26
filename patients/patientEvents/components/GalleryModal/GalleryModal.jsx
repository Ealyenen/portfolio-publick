import React from 'react';
import SlideUpModal from '../../../../../_components/UI/modals/SlideUpModal';
import Gallery from '../../../../../_components/UI/gallery/Gallery';
import {observer} from "mobx-react-lite";
import {useInstance} from "react-ioc";
import StoreGalleryModal from './store/galleryModal.store';
import BlackPreloader from '../../../../../_components/UI/preloaders/BlackPreloader';

const GalleryModal = observer(() => {
  const store = useInstance(StoreGalleryModal)

  return (
    <SlideUpModal open={store.openModal} title={'Просмотр фото'} sx={{bgcolor: '#131313'}} closeClick={() => {
      store.setCloseModal()
    }} isBtnSave={false}>
      {store.loading && <BlackPreloader/>}
      {!store.loading && <Gallery data={store.photos} startIndex={store.indexPhoto}/>}
    </SlideUpModal>
  );
});

export default GalleryModal;