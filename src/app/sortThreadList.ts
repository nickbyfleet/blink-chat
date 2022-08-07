import Thread from "./types/Thread";

export const sortThreads = (a: Thread, b: Thread) => {
    if (a.lastUpdated.isAfter(b.lastUpdated)) {
        return -1;
    } else if (a.lastUpdated.isBefore(b.lastUpdated)) {
        return 1;
    }
    return 0;
}