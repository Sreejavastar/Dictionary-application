import React, { useState } from 'react';
import './word.css'; // Import your Word component-specific CSS file

const Word = () => {
    const [word, setWord] = useState('');
    const [data, setData] = useState(null);

    const getDictData = async () => {
        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setData(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (word.trim() !== '') {
            getDictData();
        }
    };

    return (
        <>
            <h1 className="dictionary-heading">Dictionary</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        className="word-input"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        placeholder='Enter a word to search its meaning' />
                    <button type='submit' className="submit-button">Get Definition</button>
                </form>
            </div>

            {<hr></hr>}

            {data && (
                <div className="dictionary-container">
                    <h2 className="dictionary-word"> word searched : {data[0].word}</h2>
                    {data[0].phonetics && (
                        <p className="phonetic-text">
                            Phonetic: {data[0].phonetics[0].text}
                            {data[0].phonetics[0].audio && (
                                <audio className="phonetic-audio" controls>
                                    <source src={data[0].phonetics[0].audio} type="audio/mpeg" />
                                </audio>
                            )}
                        </p>
                    )}
                  {<hr></hr>}

                    <h3 className="meanings-heading">Meanings</h3>
                    <ul className="meanings-list">
                        {data[0].meanings.map((meaning, index) => (
                            <li key={index} className="meaning-item">
                                <h4 className="part-of-speech">{meaning.partOfSpeech}</h4>
                                <ul>
                                    {meaning.definitions.map((definition, idx) => (
                                        <li key={idx} className="definition-item">
                                            <strong>Definition:</strong> {definition.definition}
                                            {definition.example && (
                                                <div className="example-text">
                                                    <strong>Example:</strong> {definition.example}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                {<hr></hr>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Word;
