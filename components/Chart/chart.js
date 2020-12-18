import  { createRef } from 'react'
import { ResponsiveBar,ResponsiveBarCanvas  } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'

import barData from '../../data'
import lineData from '../../data2'
import config from './config'

class Chart extends React.Component {
    
    constructor() {
        super()
        this.buttonRef = createRef(undefined);
        this.state = { showData:"" };
      }

   
    render() {
        const saveSvgAsPng = require('save-svg-as-png');
        const imageOptions = {
            scale: 5,
            encoderOptions: 1,
            backgroundColor: 'white',
          }
        const CustomTooltip = data => {
            // console.log(data);
            let colorOp = data.id+"Color";
            // console.log(data.data[colorOp]);

            if (data.value === undefined) return null
            return (
                <span style={{ color: 'white',backgroundColor: data.data[colorOp], padding:'10px' }}>
                    {data.id} : {data.value}
                </span>
            )
        }
        const downloadButton =  () => {
            const canvas = this.buttonRef.current
            const link = document.createElement('a')
            link.download = 'chart.png'
            link.href = canvas.toDataURL('image/png')
            link.click()
        };
        const saveAsImage = (e)=>{
            var svgElem = e.currentTarget.previousElementSibling;
            var svgData = svgElem.getElementsByTagName('svg')[0];
            saveSvgAsPng.saveSvgAsPng(svgData, 'shapes.png', imageOptions);
        }
        let clickData="";
        const clickEventFunction = (e) =>{
            console.log(JSON.stringify(e))
            clickData = e.data;
            this.setState({showData:clickData});
        }

        return (
            <div className="chart">
                <ResponsiveBarCanvas
                    data={barData}
                    keys={config.keys}
                    indexBy="country"
                    margin={config.margin}
                    colors={{scheme:"nivo"}}
                    colorBy="id"
                    pixelRatio={1}
                    padding={0.25}
                    innerPadding={0}
                    minValue="auto"
                    maxValue="auto"
                    groupMode="stacked"
                    layout="vertical"
                    reverse={false}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    // defs={config.defs}
                    // fill={config.fill}
                    borderWidth={0}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', '0.2' ] ] }}
                    axisTop={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: 36 }}
                    axisRight={null}
                    axisBottom={config.axisBottom}
                    axisLeft={config.axisLeft}
                    enableGridX={true}
                    enableGridY={false}
                    enableLabel={true}
                    labelSkipWidth={5}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', '0.9' ] ] }}
                    isInteractive={true}
                    // animate={true}
                    // motionStiffness={90}
                    // motionDamping={15}
                    // legends={config.legends}
                    tooltip={CustomTooltip} 
                    onClick={clickEventFunction}
                    theme={{
                        tooltip: {
                            container: {
                                backgroundColor:"transparent",
                                padding:0
                            },
                        },
                    }}
                    ref={this.buttonRef}
                />
                <div>{JSON.stringify(this.state.showData)} test</div>
                <button onClick={downloadButton}>
                    Download Images
                </button>
                <ResponsiveBar
                    data={barData}
                    keys={config.keys}
                    indexBy="country"
                    margin={config.margin}
                    padding={0.3}
                    colors="nivo"
                    colorBy="id"
                    defs={config.defs}
                    fill={config.fill}
                    borderColor="inherit:darker(1.6)"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={config.axisBottom}
                    axisLeft={config.axisLeft}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor="inherit:darker(1.6)"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={config.legends}
                    tooltip={CustomTooltip} 
                    onClick={(data, event) => alert({ data })}
                    theme={{
                        tooltip: {
                            container: {
                                backgroundColor:"transparent",
                                padding:0
                            },
                        },
                    }}
                    ref={this.buttonRef}
                />
                <button onClick={saveAsImage}>
                    Download Images
                </button>
                <ResponsiveLine
                    data={lineData}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'transportation',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'count',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
                 <button onClick={saveAsImage}>
                    Download Images
                </button>
                <style jsx>{`
                    .chart {
                        height:50vh;
                        width:60vw;
                        background: white;
                        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                            transition: 0.3s;
                    }

                    .chart:hover {
                        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
                    }
                `}</style>
            </div>
        )
    }
}

export default Chart