import React, { useEffect, useRef, useState, RefObject } from "react";

// Определяем типы пропсов для HOC
interface WithPopupProps {
  popupMenuClickHandler: () => void;
  inputHandler: () => void;
  titlePencilHandler: () => void;
  showPopup: boolean;
  renameStatus: boolean;
  refPopup: RefObject<HTMLUListElement | null>; // Изменено на HTMLUListElement | null
  refInput: RefObject<HTMLInputElement | null>; // Изменено на HTMLInputElement | null
}

// Оборачивающий компонент HOC
export const popupWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithPopupProps>,
) => {
  return (props: P) => {
    const [showPopup, setShowPopup] = useState(false);
    const [renameStatus, setRenameStatus] = useState<boolean>(false);
    const refPopup = useRef<HTMLUListElement | null>(null); // Используем HTMLUListElement | null
    const refInput = useRef<HTMLInputElement | null>(null); // Используем HTMLInputElement | null

    const handlePopupClickOutside = (event: MouseEvent) => {
      if (
        refPopup.current &&
        !refPopup.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handlePopupClickOutside);
      return () => {
        document.removeEventListener("mousedown", handlePopupClickOutside);
      };
    }, []);

    const popupMenuClickHandler = () => {
      setShowPopup((prev) => !prev);
    };

    const inputHandler = () => {
      setRenameStatus(false);
    };

    const titlePencilHandler = () => {
      setShowPopup(false);
      setRenameStatus(true);
    };

    // Собираем все пропсы
    const allProps = {
      ...props,
      popupMenuClickHandler,
      inputHandler,
      titlePencilHandler,
      showPopup,
      renameStatus,
      refPopup,
      refInput,
    };

    return <WrappedComponent {...allProps} />;
  };
};
