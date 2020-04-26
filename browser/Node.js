// ---------------CLASS FOR THE NODE OBJECT-----------

function Node(id, status) {
  this.id = id;
  this.status = status;
  this.weight = 0;
  this.previousNode = null;
  this.direction = null;
  this.distance = Infinity;
  this.totalDistance = Infinity;
  this.heuristicDistance = null;
  this.path = null;
  this.direction = null;
}

export default Node;
