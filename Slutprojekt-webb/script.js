const data = {
  nodes: [
    {
      id: 1,
        type: "Css",
        name: "Display",
      conf: [
        {
            label: "underrubrik",
            value: "nåt annat"
        }
      ]
    },
    {
      id: 2,
        type: "Css",
        name: "Display",
      conf: [
        {
            label: "underrubrik",
            value: "nåt annat"
        }
      ]
    },
    {
      id: 3,
        type: "Css",
        name: "Display",
      conf: [
        {
            label: "underrubrik",
            value: "nåt annat"
        }
      ]
    },
    {
      id: 4,
        type: "Css",
        name: "Display",
      conf: [
        {
            label: "underrubrik",
            value: "nåt annat"
        }
      ]
    },
    {
      id: 5,
        type: "Css",
        name: "Display",
      conf: [
        {
            label: "underrubrik",
            value: "nåt annat"
        }
      ]
    },
    {
      id: 6,
        type: "Css",
        name: "Display",
      conf: [
        {
            label: "underrubrik",
            value: "nåt annat"
        }
      ]
    },
    {
      id: 7,
        type: "Css",
        name: "Display",
      conf: [
        {
            label: "underrubrik",
            value: "nåt annat"
        }
      ]
    },
    {
      id: 8,
        type: "Css",
        name: "Display",
      conf: [
        {
            label: "underrubrik",
            value: "nåt annat"
        }
      ]
    },
    {
      id: 9,
        type: "Css",
        name: "Display",
      conf: [
        {
            label: "underrubrik",
            value: "nåt annat"
        }
      ]
    },
    {
      id: 10,
        type: "Css",
        name: "Display",
      conf: [
        {
            label: "underrubrik",
            value: "nåt annat"
        }
      ]
    },
    {
      id: 11,
        type: "Css",
        name: "Display",
      conf: [
        {
            label: "underrubrik",
            value: "nåt annat"
        }
      ]
    },
    {
      id: 12,
        type: "Css",
        name: "Display",
      conf: [
        {
            label: "underrubrik",
            value: "nåt annat"
        }
      ]
    },
  ],
  edges: [
    {
      source: 1,
      target: 2
    },
    {
      source: 1,
      target: 3
    },
    {
      source: 2,
      target: 4
    },
    {
      source: 3,
      target: 4
    },
    {
      source: 4,
      target: 5
    },
    {
      source: 5,
      target: 6
    },
    {
      source: 6,
      target: 7
    },
    {
      source: 7,
      target: 8
    },
    {
      source: 1,
      target: 9
    },
    {
      source: 1,
      target: 10
    },
    {
      source: 1,
      target: 11
    },
    {
      source: 1,
      target: 12
    },
  ]
};
const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(function () {
  return {};
});
g.setGraph({ rankdir: "TB" });
const labelStyle = {
  style: {
    fill: "#fff",
    fontSize: 14,
    fontWeight: "bold"
  }
};
const edgeStyle = {
  endArrow: true,
  lineWidth: 2,
  stroke: "#272262"
};
  data.nodes.forEach((node) => {
  node.id = node.id + "";
  node.shape = "sql";
  node.label = node.name;
  node.labelCfg = labelStyle;
  node.size = [150, 50];
  g.setNode(node.id + "", { width: 150, height: 50 });
});
  data.edges.forEach((edge) => {
  edge.source = edge.source + "";
  edge.target = edge.target + "";
  edge.style = edgeStyle;
  edge.shape = "polyline";
  g.setEdge(edge.source, edge.target);
});
dagre.layout(g);
let coord;
g.nodes().forEach((node, i) => {
  coord = g.node(node);
  data.nodes[i].x = coord.x;
  data.nodes[i].y = coord.y;
});
g.edges().forEach((edge, i) => {
  coord = g.edge(edge);
  data.edges[i].startPoint = coord.points[0];
  data.edges[i].endPoint = coord.points[coord.points.length - 1];
  data.edges[i].controlPoints = coord.points.slice(1, coord.points.length - 1);
});
G6.registerNode(
  "sql",
  {
    drawShape(cfg, group) {
      const rect = group.addShape("rect", {
        attrs: {
          x: -75,
          y: -25,
          width: 150,
          height: 50,
          radius: 10,
          stroke: "#272262",
          fill: "#4038a0"
        }
      });
      return rect;
    }
  },
  "single-shape"
);
G6.Global.nodeStateStyle.selected = {
  stroke: "#4038a0",
  fill: "#0298c3"
};

const graph = new G6.Graph({
  container: "mountNode",
  width: "1000",
  height: "1000",
  pixelRatio: 2,  
  modes: {
    default: [
      "drag-canvas",
      "click-select",
      {
        type: "tooltip",
        formatText(model) {
          const cfg = model.conf;
          const text = [];
            cfg.forEach((row) => {
            text.push(row.label + ":" + row.value + "<br>");
          });
          return text.join("\n");
        }
      }
    ]
  },
  fitView: true
});
graph.data(data);
graph.render();


  