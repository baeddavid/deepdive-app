import ChartButtons from "components/viz/buttons/chart_buttons";
import ChartEditor from "components/viz/editor/chart_editor";
import applyTransforms from "components/viz/transforms/apply_transforms";
import LineChartView from "components/viz/views/line_chart_view";
import { getSetDomain } from "components/viz/viz_types/chart_helper";

class LineChartViz {
  static renderView({ schema, rows, spec, setSpec }) {
    return (
      <>
        <ChartButtons spec={spec} setSpec={setSpec} />
        <LineChartView
          schema={schema}
          rows={applyTransforms(rows, spec)}
          spec={spec}
          setDomain={getSetDomain(spec, setSpec)}
        />
      </>
    );
  }

  static renderEditor({ spec, setSpec }) {
    return <ChartEditor spec={spec} setSpec={setSpec} />;
  }

  static validateSpec(spec) {
    if (!spec.x_axis) {
      return "No horizontal axis configured. Add one to visualize";
    } else if (spec.y_axises.length === 0) {
      return "No vertical axis configured. Add one to visualize";
    } else if (spec.breakdowns.length > 1) {
      return "Line charts do not support multiple breakdowns. Remove one to visualize";
    }
  }
}

export default LineChartViz;
