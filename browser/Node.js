// ---------------CLASS FOR THE NODE OBJECT-----------

function Node(id, status) {
  this.id = id;
  this.status = status;
  this.weight = 0;
  this.previousNode = null;
}

export default Node;
