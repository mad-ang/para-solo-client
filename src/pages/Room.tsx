import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShareScreenButton } from "src/components/ShareScreenButton";
import { VideoPlayer } from "src/components/VideoPlayer";
import { PeerState } from "src/context/peerReducer";
import { RoomContext } from "src/context/RoomContext";

export const Room = () => {
    const { id } = useParams();
    const { ws, me, stream, peers, shareScreen } = useContext(RoomContext);
    useEffect(() => {
        if (me) ws.emit("join-room", { roomId: id, peerId: me._id });
    }, [id, me, ws]);
    return (
        <>
            roomId{id}
            <div>
                <VideoPlayer stream={stream} />
                {Object.values(peers as PeerState).map((peer) => (
                    <VideoPlayer stream={peer.stream} />
                ))}
                
            </div>
            <div className="fixed bottom-0 p-6 w-full flex justify-center border-t-2">
                <ShareScreenButton onClick={shareScreen} />
            </div>
        </>
    );
};
