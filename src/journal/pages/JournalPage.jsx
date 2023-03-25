import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';

import { JorunalLayout } from '../layout/JorunalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {
  
  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JorunalLayout>

      {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, impedit suscipit! Assumenda, tempora. Nisi voluptas quos, accusantium architecto cum mollitia quae quia, explicabo, unde nihil soluta at eveniet voluptatem alias?</Typography> */}

      <NothingSelectedView />

      {/* <NoteView /> */}

      <IconButton
        onClick={ onClickNewNote }
        size="large"
        sx={
          {
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 50
          }
        }>
        
        <AddOutlined sx={{ fontSize: 30 }}/>

      </IconButton>

    </JorunalLayout>
  );
}
