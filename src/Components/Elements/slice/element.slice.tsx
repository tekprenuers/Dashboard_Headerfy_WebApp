// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface Shape {
//   id: string;
//   type: "rectangle" | "circle" | "triangle";
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   color: string;
// }

// interface ElementState {
//   [templateId: string]: {
//     shapes: Shape[];
//   };
// }

// const initialState: ElementState = {
//   template_1: { shapes: [] },
//   template_2: { shapes: [] },
// };

// const elementSlice = createSlice({
//   name: "elements",
//   initialState,
//   reducers: {
//     addShape: (
//       state,
//       action: PayloadAction<{
//         templateId: "template_1" | "template_2";
//         shape: Shape;
//       }>
//     ) => {
//       state[action.payload.templateId].shapes.push(action.payload.shape);
//     },

//     updateShape: (
//       state,
//       action: PayloadAction<{
//         templateId: "template_1" | "template_2";
//         shapeId: string;
//         updates: Partial<Shape>;
//       }>
//     ) => {
//       const { templateId, shapeId, updates } = action.payload;
//       const shape = state[templateId].shapes.find((s) => s.id === shapeId);
//       if (shape) Object.assign(shape, updates);
//     },

//     deleteShape: (
//       state,
//       action: PayloadAction<{
//         templateId: "template_1" | "template_2";
//         shapeId: string;
//       }>
//     ) => {
//       const { templateId, shapeId } = action.payload;
//       state[templateId].shapes = state[templateId].shapes.filter(
//         (s) => s.id !== shapeId
//       );
//     },
//   },
// });

// export const { addShape, updateShape, deleteShape } = elementSlice.actions;
// export default elementSlice.reducer;
