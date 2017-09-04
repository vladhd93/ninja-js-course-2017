
function drawNestedSetsTree(data, node) {

    if (data.length === 0) {
        return;
    }

    let ul = document.createElement('ul');
    node.appendChild(ul);

    function getChildren(data, parent) {
        let children = [];
        data.forEach((item) => {
            if (item.left === parent.left + 1) {
                children.unshift(item);
            } else if (item.left > parent.left && item.right < parent.right) {
                children.push(item);
            }
        });
        return children;
    }

    function getSiblings(data) {
        let siblings = [data[0]];
        let foundSibling = data[0];
        while (foundSibling !== null) {
            foundSibling = findItem(data, (foundSibling.right + 1), 'left');
            if (foundSibling !== null) {
                siblings.push(foundSibling);
            }
        }

        siblings.sort(sortingItems);
        return siblings;

    }

    function findItem(items, value, side) {
        let newSide = side || 'left';
        let result = null;
        items.forEach((item) => {
            if (item[newSide] === value) {
                result = item;
                return;
            }
        });
        return result;
    }

    function sortingItems(x, y) {
        if (x.left > y.left) {
            return 1;
        }
        if (x.left < y.left) {
            return -1;
        }
    }

    data.sort(sortingItems);

    let siblings = getSiblings(data, data[0]);

    for (let i = 0; i < siblings.length; i++) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = siblings[i].title;
        drawNestedSetsTree(getChildren(data, siblings[i]), li);
    }

}

if (typeof module !== 'undefined') {
    module.exports = drawNestedSetsTree;
}