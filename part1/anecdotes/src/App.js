import React, { useState } from 'react';
import Button from './Button';
import Title from './Title';
import { getRandomIntMinMax, getIdxForMaxItem } from './helpers';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const idxForMaxItem = getIdxForMaxItem(votes);

  const nextAnecdote = () => {
    let randomNumber;
    do {
      randomNumber = getRandomIntMinMax(0, anecdotes.length - 1);
    } while (randomNumber === selected);
    setSelected(randomNumber);
  };

  const icrementAnectodeVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  };


  return (
    <>
      <Title text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" onClick={icrementAnectodeVote} />
      <Button text="next anecdote" onClick={nextAnecdote} />
      <Title text="Anecdote with most votes" />
      <div>{anecdotes[idxForMaxItem]}</div>
      <p>has {votes[idxForMaxItem]} votes</p>
    </>
  );
};

export default App;
