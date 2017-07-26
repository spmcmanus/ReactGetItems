import * as React from 'react';
import styles from './ReactGetItems.module.scss';

import { IReactGetItemsProps } from './IReactGetItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';
import * as _ from 'lodash';

import {
  DocumentCard,
  DocumentCardTitle,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardActions
} from 'office-ui-fabric-react/lib/DocumentCard';
import {
  Persona,
  PersonaInitialsColor,
} from 'office-ui-fabric-react/lib/Persona';

import {
  Image,
  IImageProps,
  ImageFit
} from 'office-ui-fabric-react/lib/Image';

import { TestImages } from '../../../../node_modules/office-ui-fabric-react/lib/common/TestImages';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Layer } from 'office-ui-fabric-react/lib/Layer';
import { css } from 'office-ui-fabric-react';

export interface IReactGetItemsState {
  incidents: [
    {
      "incidentNumber": "",
      "incidentTitle": "",
      "createdBy": "",
      "location": "",
      "incidentDate": "",
      "type": "",
      "description": ""
    }],
  incidentIdSelected: string
}

export default class ReactGetItems extends React.Component<IReactGetItemsProps, IReactGetItemsState> {

  public constructor(props: IReactGetItemsProps, state: IReactGetItemsState) {
    super(props);
    this.state = {
      incidents:
      [{
        "incidentNumber": "",
        "incidentTitle": "",
        "createdBy": "",
        "location": "",
        "incidentDate": "",
        "type": "",
        "description": ""
      }],
      incidentIdSelected: ""
    };

    this.onCardClick = this.onCardClick.bind(this)
  }

  public componentDidMount() {
    var reactHandler = this;
    jquery.ajax({
      //url: `${this.props.siteurl}/_api/web/lists/getbytitle('EmployeeList')/items`, 
      url: "/src/webparts/reactGEtItems/components/itemData.json",
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: function (resultData) {
        reactHandler.setState({
          incidents: resultData,
          incidentIdSelected: ''
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR)
        console.log(textStatus)
        console.log(errorThrown)
      }
    });

  }


  onCardClick(incident, e) {
    this.setState({
      incidents: this.state.incidents,
      incidentIdSelected: incident.incidentNumber
    })
  }

  public render(): React.ReactElement<IReactGetItemsProps> {
    console.log("RENDER!")
    console.log(this.state)
    if (this.state.incidents[0].incidentNumber == '') {
      return <div>Loading...</div>;
    } else if (this.state.incidentIdSelected == '') {
      return (
        <div className={styles.panelStyle} >
          <div className={'ms-font-xl ms-fontWeight-semibold ' + styles.titleContainer}>Demo : Retrieve Safety Incidents using SPFx , REST API  & React JS</div>
          <div className={styles.tableStyle} >
            <div className="ms-Grid">
              <div className="ms-Grid-row">
                {this.state.incidents.map((incident, key) => {
                  return (
                    <div className={styles.incidentCardContainer} key={key}>
                      <DocumentCard
                        className={styles.incidentCard}
                        onClick={this.onCardClick.bind(this, incident)}>
                        <DocumentCardTitle
                          title={incident.incidentTitle}
                          shouldTruncate={true}
                        />
                        <DocumentCardTitle
                          title={incident.incidentNumber}
                          shouldTruncate={true}
                        />
                        <DocumentCardActivity
                          activity={incident.incidentDate}
                          people={[
                            { name: incident.createdBy, profileImageSrc: '' }
                          ]}
                        />
                      </DocumentCard>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div >
      );
    } else {
      //console.log('MAP KEYS',_.mapKeys(this.state.incidents,'incidentNumber'));
      let thisIncident = _.mapKeys(this.state.incidents, 'incidentNumber')[this.state.incidentIdSelected];
      //  const imgPlaceholder = require('./placeholder.jpg');

      let imageProps: IImageProps = {
        src: 'http://placehold.it/150x150',
        imageFit: ImageFit.contain
      };
      return (
        <div>
          <Fabric>
            <div className="ms-bgColor-neutralLight">
              <div className={styles.spacerBox}></div>
              <div className={styles.incidentTitleBox}>
                <div className="ms-Grid">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm9">
                      <div>Safety Incident: {thisIncident.incidentTitle}</div>
                    </div>
                    <div className="ms-Grid-col ms-sm3">
                      <Persona
                        className={styles.floatRight}
                        primaryText={thisIncident.createdBy}
                        secondaryText='Foreman'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="ms-Grid">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm3">
                    <div className={styles.incidentBox}>
                      <div>{thisIncident.incidentNumber}</div>
                      <div className={styles.incidentLabelSm}>Job Number</div>
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm3">
                    <div className={styles.incidentBox}>
                      <div>{thisIncident.location}</div>
                      <div className={styles.incidentLabelSm}>Job Location</div>
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm3">
                    <div className={styles.incidentBox}>
                      <div>{thisIncident.incidentDate}</div>
                      <div className={styles.incidentLabelSm}>Occurred</div>
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm3">
                    <div className={styles.incidentBox}>
                      <div>{thisIncident.type}</div>
                      <div className={styles.incidentLabelSm}>Type</div>
                    </div>
                  </div>
                </div>
                <div className={styles.incidentRow}>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12">
                      <div className={styles.incidentLabel}>Description</div>
                      <div>{thisIncident.description}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.incidentRow}>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12">
                      <div className={styles.incidentLabel}>Pictures</div>
                      <div>
                        <Image { ...imageProps as any } width={150} height={150} className={styles.images} />
                        <Image { ...imageProps as any } width={150} height={150} className={styles.images} />
                        <Image { ...imageProps as any } width={150} height={150} className={styles.images} />
                        <Image { ...imageProps as any } width={150} height={150} className={styles.images} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.incidentRow}>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12">
                      <div className={styles.incidentLabel}>Full Incident Report</div>
                      <div className={styles.fullReport}>
                        Link to Full Document?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <div className='ms-BasicButtonsExample'>
                <PrimaryButton
                  data-automation-id='test'
                  text='Back'
                  onClick={() => {
                    this.setState({
                      incidents: this.state.incidents,
                      incidentIdSelected: ''
                    })
                  }}
                />
              </div>
            </div>
          </Fabric>
        </div>
      )
    }
  }
}