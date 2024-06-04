import React, { useEffect, useState, useRef } from "react";
import Sound from 'react-sound';
import "./PhotoSlideshow.css";

// Public Google Drive file IDs
const fileIDs = [
    { id:"1-30UYEzbROBRClSlWDTxymivpd0jZapB", type:"image/jpeg" }, { id:"11I8C7_T70Fw8gS0lBNRxC9dlRP4CAHA6", type:"image/jpeg" }, { id:"11eHthDG3MBcUAPCj0hVbC4JzBwSF7cdr", type:"image/jpeg" }, 
    { id:"12Mj6KgsXu3Vt7oGkjJWlNtjREq2LDJUM", type:"image/jpeg" }, { id:"14GcsJXS_oSkx-7vMVqSKBtpnfbpJdem1", type:"image/jpeg" }, { id:"14QFiZ0pX20Rfdmyv9ijjSyGuXLoRWrzV", type:"image/jpeg" }, 
    { id:"14W_5isqJ5-bND8blrFmBbwH5NqgCSYNC", type:"image/jpeg" }, { id:"14ococx-1_dwwP3ZL2mG9EeN093xZ4-D9", type:"video/quicktime" }, { id:"166cZNIHcoAVSIH0_PW8xUrCeJl87yT3R", type:"image/jpeg" }, 
    { id:"18aqY5ZDfjq035vTIdxLekPx59neY-5c9", type:"image/jpeg" }, { id:"1D5DMxcGY7RO55ksXNoif9AzhUAtSn2Bx", type:"image/jpeg" }, { id:"1G8EoT24gJPKMjGQBBRUCkzg42IXQqwth", type:"image/jpeg" }, 
    { id:"1GtUfztiEumYjidITjpJBXzqjBE6Ex7Fb", type:"image/jpeg" }, { id:"1HV6I-XtdXEliU4vY9TSsVwDT0fDE7Xnl", type:"image/jpeg" }, { id:"1IQlkk-VLQOM2v-D8pM5Gbdv5jJhHv1x1", type:"video/quicktime" }, 
    { id:"1Ic6aj35lYoSmO3cZ9_0lipSHPSsbREAj", type:"video/quicktime" }, { id:"1KFQb60xYj3RlcVaYKZrdeZuUzSr6fa_c", type:"image/jpeg" }, { id:"1Kmt4hcKpG1GUWOzj48LeH-uB0ww_fcHw", type:"image/jpeg" }, 
    { id:"1L3Rvv-7ARD3dcK1bNE7ENwKO_21AJ5XJ", type:"image/jpeg" }, { id:"1L61Z9HXQUYjjUlSdmlgJNkrTUt8AeRW9", type:"image/jpeg" }, { id:"1LdsIui5pyEfs3pgveh2O4Z4HRmmEwfpo", type:"image/jpeg" }, 
    { id:"1MGqlUZ8BKBLC63uC0iIYi2r5WcUebqLe", type:"image/jpeg" }, { id:"1Ode3t_z88bHhgx4fnaBvRu_JkuM9XsSk", type:"image/jpeg" }, { id:"1Og7dbxakDT9Cyn6-rokrgJY2qGHXhXFa", type:"image/jpeg" }, 
    { id:"1P4o9y221TM_qgg0LSpHymNkt5zjdGlzu", type:"image/jpeg" }, { id:"1R-xi9C10m4tZk6C5bBad7UnM3NNLrGtr", type:"image/jpeg" }, { id:"1SzcRrY8Q97VLgrs_B8YRrKSy7rZgJlFg", type:"image/jpeg" }, 
    { id:"1TGdu6WZWJIlXUmiS2XfcuVEyXpkM-Z8v", type:"image/jpeg" }, { id:"1TsfLQOIGUTnT9PE3imZENbaQft4fniLv", type:"image/jpeg" }, { id:"1W7W4_u2eGyDcFAlsF2YbUIL6InRwa1kJ", type:"image/jpeg" }, 
    { id:"1Wmy0GdXhTcxq61ww1F1FuUqPl9rXjpPT", type:"image/jpeg" }, { id:"1ZEEjfc0_GPP_9kThzI5pBQsO-NQ6JKP-", type:"image/jpeg" }, { id:"1ZKm67x8_3Ymd8euX4sHPHvCtuQZx0n1j", type:"image/jpeg" }, 
    { id:"1cYwMOWU-78tlcVTQa1ReboyVmnQWoMWT", type:"image/jpeg" }, { id:"1edIARJh7JlvyxyOaTIOacdZ-kPX3zsQq", type:"image/jpeg" }, { id:"1fVXPaVk_ISs54XQtaTSSjT1CA5i-getX", type:"image/jpeg" }, 
    { id:"1fmU4WQYSqS47iooSZAPTp-ozEnB-BmeZ", type:"image/jpeg" }, { id:"1hZsRFYdaq99QbfYvP9zpzobIWCRTEXL1", type:"image/jpeg" }, { id:"1iVAHo1Wms8c59igUxT8lttpGeUzFd2hP", type:"image/jpeg" }, 
    { id:"1juKp85jLCGcFx_uSn7arurqMNIjyzJxo", type:"image/jpeg" }, { id:"1lPMoJOlPCvMaw69IQw5Ign0R6ZxhCaRw", type:"image/jpeg" }, { id:"1mVhSMDf8FkHu5ytQJ4HhWjWZWbM7ij4W", type:"video/quicktime" }, 
    { id:"1mbYz4MyQFdYp540iWvsTka1Zq_gAZa3n", type:"image/jpeg" }, { id:"1n7XDshZPXMus1BHi0JwyZJmXkpQZhF38", type:"image/jpeg" }, { id:"1nsDCRy2dReBwE2QJv4uXucvVLtQPtyzV", type:"image/jpeg" }, 
    { id:"1of7eF7eYXN-PQw3bcAe8dnrpkZnZwERn", type:"image/jpeg" }, { id:"1p4oyVwWGElxhsdEvLTk-Hg-0oNiSVuOs", type:"image/jpeg" }, { id:"1qGvfNXyIRRIuy4qz4EdO9S1ovIyNugry", type:"image/jpeg" }, 
    { id:"1qYnuenmpga1LqFFbcFvp5lOFLCmtnSEi", type:"image/jpeg" }, { id:"1qZBwLjeTdfqqJnS-_A0Oj6pWJCj-6iV0", type:"image/jpeg" }, { id:"1qsKlgh49-sWLZh6dMElhDbhyTBDMPwjR", type:"image/jpeg" }, 
    { id:"1t07H6ETrJsV0c36c8TCgds2fxzge3jjE", type:"image/jpeg" }, { id:"1tZjDV-bir21cRuj2cXxT8b4to_JbeGay", type:"image/jpeg" }, { id:"1u01rAnHEHeuDpQ_B3iNt1yP8nf8LNtSn", type:"image/jpeg" }, 
    { id:"1vS7U-iw2KpO-HFpeTTlAJhS61Bs_E3Dz", type:"image/jpeg" }, { id:"1vuAc53f-zkqRSMT1trxGrTv4lZwuWYcr", type:"image/jpeg" }, { id:"1wxOiPhurE1hV2wbgDLGXzrd9wiYhv8HG", type:"image/jpeg" }, 
    { id:"1yji6e73qXPoiNhpzfUKBigRKH3N7d5Ib", type:"image/jpeg" },
];

const files = fileIDs.map(id => ({
    url: `http://localhost:4000/image/${id.id}`,
    type: id.type
}));

const getRandomInt = (max) => Math.floor(Math.random() * max);

const getRandomDirection = () => {
    const directions = ["left", "right", "up", "down"];
    return directions[getRandomInt(directions.length)];
};

const soundUrls = [
    "/Sounds/Kiss_the_Rain.mp3",
    "/Sounds/Canon_in_D.mp3",
    "/Sounds/River_Flows_in_You.mp3"
];

function PhotoSlideshow() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState("right");
    const [duration, setDuration] = useState(26); // Default duration
    const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);
    const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
    const playButtonRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % files.length);
            setDirection(getRandomDirection());
        }, duration * 1000);
        return () => clearInterval(interval);
    }, [index, duration]);

    useEffect(() => {
        console.log(`Playing audio from: ${soundUrls[currentSoundIndex]}`);
        if (playButtonRef.current) {
            playButtonRef.current.click();
        }
    }, [currentSoundIndex]);

    const handleSongFinishedPlaying = () => {
        setCurrentSoundIndex((prevIndex) => (prevIndex + 1) % soundUrls.length);
        setPlayStatus(Sound.status.PLAYING);
    };

    const startAudio = () => {
        setPlayStatus(Sound.status.PLAYING);
    };

    const file = files[index];

    const handleLoadedMetadata = (e) => {
        setDuration(Math.ceil(e.target.duration));
    };

    return (
        <div className="slideshow">
            <button 
                onClick={startAudio} 
                ref={playButtonRef} 
                style={{ visibility: 'hidden' }}
            >
                Play Music
            </button>
            <Sound
                url={soundUrls[currentSoundIndex]}
                playStatus={playStatus}
                loop={false}
                autoLoad={true}
                volume={15}
                onLoading={({ bytesLoaded, bytesTotal }) => console.log(`${bytesLoaded} / ${bytesTotal}`)}
                onLoad={() => console.log('Loaded successfully')}
                onError={(errorCode) => {
                    console.error('Sound error:', errorCode);
                    handleSongFinishedPlaying(); // Move to next sound on error
                }}
                onFinishedPlaying={handleSongFinishedPlaying}
            />
            {file.type.includes("image") ? (
                <img
                    key={index}
                    src={file.url}
                    alt={`slide ${index}`}
                    className={`slide ${direction}`}
                    onLoad={() => setDuration(26)}
                />
            ) : (
                <video
                    key={index}
                    src={file.url}
                    className={`slide ${direction}`}
                    autoPlay
                    loop={false}
                    muted
                    onLoadedMetadata={handleLoadedMetadata}
                />
            )}
        </div>
    );
}

export default PhotoSlideshow;