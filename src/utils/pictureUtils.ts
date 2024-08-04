import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

export interface PictureType {
  url: string;
  file: File;
}

const usePictureHandlers = () => {
  const { setValue } = useFormContext();

  const handleAddPicture = (
    event: ChangeEvent<HTMLInputElement>,
    setPictures: React.Dispatch<React.SetStateAction<PictureType[]>>,
    setMainPicture: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // 파일이 존재하고, 하나 이상인 경우에만 처리
      const newPictures = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setPictures((prevPictures) => {
        const updatedPictures = [...prevPictures, ...newPictures];
        if (updatedPictures.length === newPictures.length) {
          setMainPicture(newPictures[0].url);
        }
        setValue(
          'fileList',
          updatedPictures.map((picture) => picture.file)
        );
        setValue('mainPicture', updatedPictures[0].url);
        return updatedPictures;
      });
    }
  };

  const handleRemovePicture = (
    url: string,
    setPictures: React.Dispatch<React.SetStateAction<PictureType[]>>,
    setMainPicture: React.Dispatch<React.SetStateAction<string | null>>,
    mainPicture: string | null
  ) => {
    setPictures((prevPictures) => {
      const updatedPictures = prevPictures.filter((picture) => picture.url !== url);
      if (mainPicture === url && updatedPictures.length > 0) {
        setMainPicture(updatedPictures[0].url);
        setValue('mainPicture', updatedPictures[0].url); // 수정됨
      } else if (updatedPictures.length === 0) {
        setMainPicture(null);
        setValue('mainPicture', null);
      }
      setValue(
        'fileList',
        updatedPictures.map((picture) => picture.file)
      );
      return updatedPictures;
    });
  };

  const handleSetMainPicture = (
    url: string,
    setMainPicture: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setMainPicture(url);
    setValue('mainPicture', url);
  };

  return {
    handleAddPicture,
    handleRemovePicture,
    handleSetMainPicture,
  };
};

export { usePictureHandlers };
