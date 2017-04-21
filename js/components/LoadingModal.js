import React, {PropTypes,Component} from 'react'
import {ModalContainer,ModalDialog} from 'react-modal-dialog'
import css from '../../style/loadingModal.css'


class LoadingModal extends Component {
  constructor() {
  super()
  this.state =  {
    isShowingModal: true,
   }
  }

  render() {
    return(
      <div>
      {
        this.state.isShowingModal &&
        <ModalContainer>
          <ModalDialog>
            <div className={css.loader}/>
          </ModalDialog>
        </ModalContainer>
      }
    </div>)
  }
}
export default LoadingModal