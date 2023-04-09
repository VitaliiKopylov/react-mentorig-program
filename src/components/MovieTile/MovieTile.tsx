import { BsThreeDotsVertical } from "react-icons/bs";
import { IconContext } from "react-icons";

import { useState } from 'react';
import BaseDropdown from '../BaseDropdown/BaseDropdown';

import { IMovie } from '../../types';
import styles from './styles.module.scss';

interface MovieTileProps {
  movie: IMovie;
  onMovieClick: () => void;
  onMovieDelete: () => void;
  onMovieEdit: () => void;
}

const MovieTile = ({ movie, onMovieClick, onMovieDelete, onMovieEdit }: MovieTileProps) => {
  const { imageUrl, name, releaseYear, genres } = movie;
  const [open, setOpen] = useState(false);

  function optionSelected(option: any) {
    if (option === 'Delete') onMovieDelete();
    if (option === 'Edit') onMovieEdit();
    setOpen(false);
  }
  // const [showMenu, setShowMenu] = useState(false);

  // const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   setShowMenu(true);
  // };

  // const handleEditClick = () => {
  //   // TODO: handle edit click
  //   setShowMenu(false);
  // };

  // const handleDeleteClick = () => {
  //   // TODO: handle delete click
  //   setShowMenu(false);
  // };

  return (
    <div className={styles.movieTile} onMouseLeave={() => setOpen(false)}>
      <div className={styles.movieTile__top}>
        <img
          className={styles.movieTile__image}
          src={imageUrl}
          alt={name}
          onClick={onMovieClick}
        />
        <div className={styles.movieTile__action}>
          <button className={styles.movieTile__btn} onClick={() => setOpen(true)}>
            <IconContext.Provider value={{ color: "var(--white)" }}>
              <BsThreeDotsVertical />
            </IconContext.Provider>
          </button>
          {open && (
            <div className={styles.movieTile__dd}>
              <BaseDropdown options={['Edit', 'Delete']} onSelected={optionSelected} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.movieTile__info}>
        <div>
          <h2 className={styles.movieTile__title}>{name}</h2>
          <div className={styles.movieTile__genres}>{genres.join(', ')}</div>
        </div>
        <div className={styles.movieTile__year}>{releaseYear}</div>
      </div>
    </div>
  );
};

export default MovieTile;
