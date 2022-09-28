import {Pane, Dialog, Button} from 'evergreen-ui'
import React, {FunctionComponent} from 'react'

const Page1: FunctionComponent = () => {
  const [isShown, setIsShown] = React.useState(false)

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title="Dialog title"
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Submit"
      >
        Dialog content for v1.0.0
      </Dialog>
      <Button onClick={() => setIsShown(true)}>Show Dialog v1.0.0</Button>
    </Pane>
  )
};

export default Page1