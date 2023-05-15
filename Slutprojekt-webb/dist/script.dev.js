"use strict";

var data = {
  nodes: [{
    id: 1,
    type: "Css",
    name: "Display",
    conf: [{
      label: "underrubrik",
      value: "nåt annat"
    }]
  }, {
    id: 2,
    type: "Css",
    name: "Display",
    conf: [{
      label: "underrubrik",
      value: "nåt annat"
    }]
  }, {
    id: 3,
    type: "Css",
    name: "Display",
    conf: [{
      label: "underrubrik",
      value: "nåt annat"
    }]
  }, {
    id: 4,
    type: "Css",
    name: "Display",
    conf: [{
      label: "underrubrik",
      value: "nåt annat"
    }]
  }, {
    id: 5,
    type: "Css",
    name: "Display",
    conf: [{
      label: "underrubrik",
      value: "nåt annat"
    }]
  }, {
    id: 6,
    type: "Css",
    name: "Display",
    conf: [{
      label: "underrubrik",
      value: "nåt annat"
    }]
  }, {
    id: 7,
    type: "Css",
    name: "Display",
    conf: [{
      label: "underrubrik",
      value: "nåt annat"
    }]
  }, {
    id: 8,
    type: "Css",
    name: "Display",
    conf: [{
      label: "underrubrik",
      value: "nåt annat"
    }]
  }, {
    id: 9,
    type: "Css",
    name: "Display",
    conf: [{
      label: "underrubrik",
      value: "nåt annat"
    }]
  }, {
    id: 10,
    type: "Css",
    name: "Display",
    conf: [{
      label: "underrubrik",
      value: "nåt annat"
    }]
  }, {
    id: 11,
    type: "Css",
    name: "Display",
    conf: [{
      label: "underrubrik",
      value: "nåt annat"
    }]
  }, {
    id: 12,
    type: "Css",
    name: "Display",
    conf: [{
      label: "underrubrik",
      value: "nåt annat"
    }]
  }],
  edges: [{
    source: 1,
    target: 2
  }, {
    source: 1,
    target: 3
  }, {
    source: 2,
    target: 4
  }, {
    source: 3,
    target: 4
  }, {
    source: 4,
    target: 5
  }, {
    source: 5,
    target: 6
  }, {
    source: 6,
    target: 7
  }, {
    source: 7,
    target: 8
  }, {
    source: 1,
    target: 9
  }, {
    source: 1,
    target: 10
  }, {
    source: 1,
    target: 11
  }, {
    source: 1,
    target: 12
  }]
};
var g = new dagre.graphlib.Graph();
g.setDefaultEdgeLabel(function () {
  return {};
});
g.setGraph({
  rankdir: "TB"
});
var labelStyle = {
  style: {
    fill: "#fff",
    fontSize: 14,
    fontWeight: "bold"
  }
};
var edgeStyle = {
  endArrow: true,
  lineWidth: 2,
  stroke: "#e84a5f"
};
data.nodes.forEach(function (node) {
  node.id = node.id + "";
  node.shape = "sql";
  node.label = node.name;
  node.labelCfg = labelStyle;
  node.size = [150, 50];
  g.setNode(node.id + "", {
    width: 150,
    height: 50
  });
});
data.edges.forEach(function (edge) {
  edge.source = edge.source + "";
  edge.target = edge.target + "";
  edge.style = edgeStyle;
  edge.shape = "polyline";
  g.setEdge(edge.source, edge.target);
});
dagre.layout(g);
var coord;
g.nodes().forEach(function (node, i) {
  coord = g.node(node);
  data.nodes[i].x = coord.x;
  data.nodes[i].y = coord.y;
});
g.edges().forEach(function (edge, i) {
  coord = g.edge(edge);
  data.edges[i].startPoint = coord.points[0];
  data.edges[i].endPoint = coord.points[coord.points.length - 1];
  data.edges[i].controlPoints = coord.points.slice(1, coord.points.length - 1);
});
G6.registerNode("sql", {
  drawShape: function drawShape(cfg, group) {
    var rect = group.addShape("rect", {
      attrs: {
        x: -75,
        y: -25,
        width: 150,
        height: 50,
        radius: 10,
        stroke: "#e84a5f",
        fill: "#e84a5f"
      }
    });
    return rect;
  }
}, "single-shape");
G6.Global.nodeStateStyle.selected = {
  stroke: "#d9d9d9",
  fill: "#ff0099"
};
var graph = new G6.Graph({
  container: "mountNode",
  width: "1000",
  height: "1000",
  pixelRatio: 2,
  modes: {
    "default": ["drag-canvas", "click-select", {
      type: "tooltip",
      formatText: function formatText(model) {
        var cfg = model.conf;
        var text = [];
        cfg.forEach(function (row) {
          text.push(row.label + ":" + row.value + "<br>");
        });
        return text.join("\n");
      }
    }]
  },
  fitView: true
});
graph.data(data);
graph.render();