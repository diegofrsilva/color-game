
/**
 * Controller for the ranking logic. It iteracts with localStorage to add, sort and get the first 10. 
 */
function Ranking() {
    const PROPERTY_NAME = "ranking";
    const RANKING_SIZE = 10;

    /**
     * Inserts a player in the ranking
     * 
     * @param {string} name The name of the player
     * @param {int} level The level the player archieved.
     */
    this.put = function (name, level) {
        const ranking = this.get();
        ranking.push({
            name: name,
            level: level,
            timestamp: new Date().getTime()
        });
        localStorage.setItem(PROPERTY_NAME, JSON.stringify(truncate(sorted(ranking))));
    }

    /**
     * Get all the players saved in the ranking
     */
    this.get = function () {
        const rankingAsJson = localStorage.getItem(PROPERTY_NAME);
        const ranking = rankingAsJson ? JSON.parse(rankingAsJson) : [];

        return ranking;
    }

    /**
     * Sorts the players in the ranking according to the level archieved (In case of draw the ones who played first will be first)
     * @param {array} ranking 
     */
    function sorted(ranking) {
        ranking.sort((first, second) => {
            const level = second.level - first.level;
            if (level == 0) {
                return first.timestamp - second.timestamp;
            }
            return level;
        });
        return ranking;
    }

    /**
     * Truncate the ranking list to the desired size if necessary
     * @param {array} ranking 
     */
    function truncate(ranking) {
        return ranking.splice(0, RANKING_SIZE);
    }
}

module.exports = Ranking