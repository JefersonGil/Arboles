import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.PriorityQueue;

public class DijkstrasAlgorithm {

    public void calculatePath(Vertex source) {
        source.setDistanceToStart(0);

        PriorityQueue < Vertex > queue = new PriorityQueue<>(); // Arbol de orden natural
        queue.add(source);

        while (!queue.isEmpty()) {

            Vertex currentVertex = queue.poll(); // Recupera y elimina el encabezado de la lista

            for (Edge edge: currentVertex.getAdjecencyList()) {

                Vertex u = edge.getStartVertex();
                Vertex v = edge.getTargetVertex();

                double currentDistance = currentVertex.getDistanceToStart() + edge.getWeight();

                if (currentDistance < v.getDistanceToStart()) {
                    queue.remove(v);
                    v.setDistanceToStart(currentDistance);
                    v.setPredecesor(currentVertex);
                    queue.add(v);
                }

            }
        }

    }
    public List<Vertex> getShortestPathTo(Vertex targetVertex) {

        List < Vertex > path = new ArrayList<>();
        for (Vertex vertex = targetVertex; vertex != null; vertex = vertex.getPredecesor()) {
            path.add(vertex);
        }
        Collections.reverse(path);

        return path;
    }

}
34  src / Edge.java
@@ -1, 2 + 1, 36 @@
    public class Edge {

    private double weight;
    private Vertex startVertex;
    private Vertex targetVertex;

    public Edge(double weight, Vertex startVertex, Vertex targetVertex) {
        this.weight = weight;
        this.startVertex = startVertex;
        this.targetVertex = targetVertex;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public Vertex getStartVertex() {
        return startVertex;
    }

    public void setStartVertex(Vertex startVertex) {
        this.startVertex = startVertex;
    }

    public Vertex getTargetVertex() {
        return targetVertex;
    }

    public void setTargetVertex(Vertex targetVertex) {
        this.targetVertex = targetVertex;
    }
}
21  src / Main.java
@@ -1, 2 + 1, 23 @@
    public class Main {
    public static void main(String[] args) {

        Vertex vertexA = new Vertex("A");
        Vertex vertexB = new Vertex("B");
        Vertex vertexC = new Vertex("C");
        Vertex vertexD = new Vertex("D");

        vertexA.addNeighbour(new Edge(3, vertexA, vertexB));
        vertexA.addNeighbour(new Edge(5, vertexA, vertexC));

        vertexB.addNeighbour(new Edge(4, vertexB, vertexC));

        vertexC.addNeighbour(new Edge(15, vertexC, vertexD));

        vertexD.addNeighbour(new Edge(10, vertexD, vertexA));

        DijkstrasAlgorithm dijkstrasAlgorithm = new DijkstrasAlgorithm();
        dijkstrasAlgorithm.calculatePath(vertexA);
        System.out.println(dijkstrasAlgorithm.getShortestPathTo(vertexD));

    }
}
72  src / Vertex.java
@@ -1, 2 + 1, 72 @@
    public class Vertex {
import java.util.ArrayList;
import java.util.List;

public class Vertex implements Comparable<Vertex> {
    // Representa un vertice del grafico

    private String name;
    private boolean visited;
    private List<Edge> adjecencyList;
    private double distanceToStart;
    private Vertex predecesor;

    public Vertex(String name) {
        this.name = name;
        this.adjecencyList = new ArrayList<>();
        this.distanceToStart = Double.MAX_VALUE;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isVisited() {
        return visited;
    }

    public void setVisited(boolean visited) {
        this.visited = visited;
    }

    public List<Edge> getAdjecencyList() {
        return adjecencyList;
    }

    public void addNeighbour(Edge edge) {
        this.adjecencyList.add(edge);
    }

    public double getDistanceToStart() {
        return distanceToStart;
    }

    public void setDistanceToStart(double distanceToStart) {
        this.distanceToStart = distanceToStart;
    }

    public Vertex getPredecesor() {
        return predecesor;
    }

    public void setPredecesor(Vertex predecesor) {
        this.predecesor = predecesor;
    }

    @Override
    public int compareTo(Vertex adjecentVertex) {
        //Comparaciones para la distancia entre los distintos parametros
        // En caso de que u parametro sea mayor que otro
        return Double.compare(this.distanceToStart, adjecentVertex.getDistanceToStart());
    }

    @Override
    public String toString() {
        return "Vertex{" +
            "name='" + name + '\'' +
            '}';
    }
}
