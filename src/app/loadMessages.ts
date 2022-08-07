import Thread from "./types/Thread";
import Message from "./types/Message";

export const loadMessages = (): Promise<{ [index: string]: Thread }> => {
    return fetch('messages.json',
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then((response) => {
            return response.json();
        }).then((json) => {
            const threads: { [index: string]: Thread; } = {};
            json.forEach((thread: { id: string; name: string; last_updated: string; messages: any[]; }) => {
                threads[thread.id] = new Thread(thread.id, thread.name, thread.last_updated, thread.messages.map((message) => {
                    return new Message(message.id, message.text, message.last_updated);
                }));
            });
            return threads;
        });
}
