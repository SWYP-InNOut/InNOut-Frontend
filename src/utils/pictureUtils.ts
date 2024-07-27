import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

interface PictureType {
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
    if (files) {
      const newPictures = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setPictures((prevPictures) => {
        const updatedPictures = [...prevPictures, ...newPictures];
        if (updatedPictures.length === newPictures.length) {
          setMainPicture(newPictures[0].url);
        }
        console.log(updatedPictures);
        console.log(updatedPictures.map((pic) => pic.url));
        setValue(
          'images',
          updatedPictures.map((pic) => pic.url.replace('blob:', ''))
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
        setValue('mainPicture', updatedPictures[0].url);
      } else if (updatedPictures.length === 0) {
        setMainPicture(null);
        setValue('mainPicture', null);
      }
      setValue(
        'images',
        updatedPictures.map((pic) => pic.url.replace('blob:', ''))
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
export type { PictureType };
