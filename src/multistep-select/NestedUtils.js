import _ from 'lodash';

//@TODO Import only needed functions from lodash

export default class NestedUtils {

    constructor(data) {
        this.data = data;
    }

    /**
     * @param  {number} id
     * @return {Array}
     */
    orderFromParentsToChildren(id) {
        const item = this.findItemById(id);

        if (!item) {
            throw new Error(`Item with id ${id} not found.`);
        }

        const parent = this.findItemById(item.parentId);

        if (parent) {
            return [...this.orderFromParentsToChildren(parent.id), ...[item]];
        } else {
            return [item];
        }
    };

    /**
     * Find items that don't have parents and get that list
     *
     * @returns {Array.<object>}
     */
    getRootItems() {
        const minimumParent = this.data.reduce((prev, current) => {
            return prev.parentId <= current.parentId ? prev : current;
        }, {});

        return _.filter(this.data, {parentId: minimumParent.parentId}) || [];
    }

    /**
     * @param   {number}   id
     * @returns {boolean}
     */
    hasChildren(id) {
        return this.getChildren(id).length > 0;
    };

    hasParent(id) {
        return this.findItemById(id).parentId !== null;
    }

    /**
     * @param    {number}          id
     * @returns  {Array.<object>}
     */
    getChildren(id) {
        const item = this.findItemById(id);

        if (!item) {
            return [];
        }

        // get items by ids
        return _.filter(this.data, child => {
            return item.children.indexOf(child.id) !== -1
        });
    }

    /**
     * @param    {number}          id
     * @param    {boolean}         includeOriginal
     * @returns  {Array.<object>}
     */
    getNeighbours(id, includeOriginal = true) {
        const item = this.findItemById(id);

        if (!item) {
            return [];
        }

        let neighbours = _.filter(this.data, {parentId: item.parentId});

        if (!includeOriginal) {
            neighbours = _.filter(neighbours, item => item.id !== id);
        }

        return neighbours;
    }

    /**
     * @param   {Array.<number>|undefined}  ids             Optional, array of ids
     * @returns {Array.<string>}                            List of labels / names for the items
     */
    getLabels(ids = undefined) {
        let data = this.data;

        if (ids) {
            data = this.findByIds(ids);
        }

        return data.map(item => item.name);
    }

    /**
     * @param  {number}            id
     * @return {object|undefined}
     */
    findItemById(id) {
        id = parseInt(id, 10);
        return _.find(this.data, {id});
    };

    /**
     *
     * @param   {Array.<number>}  ids             Array of ids
     * @returns {Array.<object>}
     */
    findByIds(ids) {
        return _.filter(this.data, item => ids.indexOf(item.id) !== -1);
    }

}