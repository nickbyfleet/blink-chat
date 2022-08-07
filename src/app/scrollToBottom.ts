export const scrollToBottom = (node: HTMLElement | null) => {
    if (node === null) {
        return;
    }

    node.scrollTop = node.scrollHeight;
}