const node = require('./Node.js');

class linkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(value) {
        this.head = new node(value, this.head);
    }

    insertBefore(value, key) {
        if(this.head === null) return null;
        else {
            let previousNode = null; 
            let currentNode = this.head;

            while(currentNode.value !== key) {
                if(currentNode.next === null) {
                    return null;
                }

                previousNode = currentNode;
                currentNode = currentNode.next;
            }

            if(!previousNode) this.insertFirst(value);
            else {
                previousNode.next = new node(value, previousNode.next);
            }
        }
    }

    insertAfter(value, key) {
        if(this.head === null) return null;
        else {
            let foundNode = this.find(key);

            if(!foundNode) return null;
            else {
                foundNode.next = new node(value, foundNode.next);
            }
        }
    }
    //| 0| 1| 2| 3| 4| 5| 6|
    //| 0| x| 1| 2| 3| 4| 5| 6|
    insertAt(value, index) {
        if(index < 0) throw new Error('Index cannot be less than 0.');
        else {
            let previousNode = null; 
            let currentNode = this.head; 

            for(let i = 0; i < index; i++) {
                if(currentNode === null) return null;
                else {
                    previousNode = currentNode;
                    currentNode = currentNode.next;
                }
            }

            if(!previousNode) this.insertFirst(value); 
            else {
                previousNode.next = new node(value, currentNode);
            }
        }
    }

    insertLast(value) {
        if(this.head === null) this.insertFirst(value);
        else {
            let currentNode = this.head;

            while(currentNode.next !== null) {
                currentNode = currentNode.next;
            }

            currentNode.next = new node(value, null);
        }
    }

    find(value) {
        if(this.head === null) return null;
        else {
            let currentNode = this.head;

            while(currentNode.value !== value) {
                if(currentNode.next === null) return null;
                else {
                    currentNode = currentNode.next;
                }
            }

            return currentNode;
        }
    }

    remove(value) {
        if(this.head === null) return null;
        else {
            let previousNode = null;
            let currentNode = this.head;

            while(currentNode.value !== value) {
                if(currentNode.next === null) return null;
                else {
                    previousNode = currentNode;
                    currentNode = currentNode.next;
                }
            }

            if(!previousNode) this.head = currentNode.next;
            else {
                previousNode.next = currentNode.next;
            }

        }
    }
}

function copy(start, end, ll) {
    let copied = new linkedList();
    let current = ll.head;

    let counter = 0;
    while(counter < start) {
        if(current === null) break;
        current = current.next;
        counter++;
    }

    while(start< end) {
        if(current === null) break;
        copied.insertLast(current.value);
        current = current.next;
        start++;
    }

    return copied;
}   


function size(ll) {
    if(ll.head === null) return 0;
    else {
        let counter = 0;
        let currentNode = ll.head;

        while(currentNode) {
            currentNode = currentNode.next;
            counter++;
        }
        return counter;
    }
}

function isEmpty(ll) {
    if(ll.head === null) return true;
    else return false;
}


function middle(ll) {
    if(ll.head === null || ll.head.next === null) return ll.head;
    else {
        let middlePoint = Math.ceil(size(ll) / 2);
        let counter = 1;
        let currentNode = ll.head;

        while (counter !== middlePoint) {
            currentNode = currentNode.next;
            counter++;
        }

        return counter;
    }
}


module.exports = {
    size,
    isEmpty,
    middle,
    linkedList,
    copy
};
