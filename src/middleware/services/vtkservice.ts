// WRAPPING BASIC VTK INTERFACE as TYPES

export interface VtkFigure {
    setResolution(value: number): void,
    getOutputPort(): void,
}

export interface VtkActor {
    getProperty(): any,
}

export interface VtkRenderer {
    addActor(actor: any): void,
    resetCamera(): void,
    setBackground(r: number, g: number, b: number): void,
}

export interface VtkRenderWindow {
    render(): void,
}


// WRAPPING BASIC VTK INTERFACE as TYPES
export const getVtkFullScreenRenderComponents = (vtk: any, source: VtkFigure) => {
    const fullScreenRenderer = vtk.Rendering.Misc.vtkFullScreenRenderWindow.newInstance();
    const actor = vtk.Rendering.Core.vtkActor.newInstance();
    const mapper = vtk.Rendering.Core.vtkMapper.newInstance();

    actor.setMapper(mapper);
    mapper.setInputConnection(source.getOutputPort());

    const renderer = fullScreenRenderer.getRenderer();
    renderer.addActor(actor);
    renderer.resetCamera();

    const renderWindow = fullScreenRenderer.getRenderWindow();
    return {renderer: renderer as VtkRenderer, renderWindow: renderWindow as VtkRenderWindow, actor: actor as VtkActor} 
}

export const getVtkConeInstance = (vtk: any) => {
    const cone = vtk.Filters.Sources.vtkConeSource.newInstance() as VtkFigure;
    return cone;
}