import { useState, useEffect, useRef } from 'react'
import { ConfigProvider, Button, Space, Divider, Modal, message } from 'antd'
import { OrderSteps } from './components/StepComponent'
import { WelcomeModal, WelcomeTour } from './components/HomePageComponent'
import { STEP_LENGTH, MAX_NUMBER_OF_DISHES } from './utils/constant'
import enUS from 'antd/locale/en_US'
import './assets/App.less'

function App() {
  const [currentProgress, setCurrentProgress] = useState<number>(0)
  const [openTour, setOpenTour] = useState<boolean>(false)
  const [openTourModal, setOpenTourModal] = useState<boolean>(false)
  const [orderForm, setOrderForm] = useState<Types.OrderForm>({
    meal: 'lunch',
    number: 1,
    restaurant: '',
    dishes: [],
  })


  const tourRef1 = useRef(null)
  const tourRef2 = useRef(null)
  const tourRef3 = useRef(null)
  const tourRef4 = useRef(null)

  const handlePreviousClick = () => {
    currentProgress > 0 && setCurrentProgress(currentProgress - 1)
  }

  const handleNextClick = () => {
    localStorage.setItem('orderForm', JSON.stringify(orderForm))
    localStorage.setItem('currentProgress', currentProgress + 1 + '')


    if (currentProgress === 1) {
      if (!orderForm.restaurant) {
        message.warning({
          content: 'Please select a restaurant before proceeding to the next step.',
        })
        return
      }
    } else if (currentProgress === 2) {
      let totalDishes = 0
      for (const item of orderForm.dishes) {
        if (item.dish && item.number) {
          totalDishes += item.number
        }
      }
      if (totalDishes === 0) {
        message.warning({
          content: 'Please select any dishes before proceeding to the next step.',
        })
        return
      } else if (totalDishes < orderForm.number) {
        Modal.warning({
          title: `Not enough dishes for ${orderForm.number} people`,
          content: 'Please select more dishes.',
          okText: 'OK',
        })
        return
      } else if (totalDishes > MAX_NUMBER_OF_DISHES) {
        Modal.warning({
          title: 'Too many dishes',
          content: 'Please select less than 10 dishes.',
          okText: 'OK',
        })
        return
      }
    } else if (currentProgress === STEP_LENGTH) {
      Modal.success({
        title: 'Order Submitted',
        content: 'Your order has been submitted successfully, please wait for serving.',
        okText: 'OK',
      })
      const finalOrderInfo = {
        ...orderForm,
        dishes: orderForm.dishes.filter(item => item.dish && item.number),
      }

      localStorage.removeItem('orderForm')
      localStorage.removeItem('currentProgress')
    }

    currentProgress < STEP_LENGTH && setCurrentProgress(currentProgress + 1)
  }

  const handleTourModalOk = () => {

    const deviceType = window.innerWidth > 768 ? 'pc' : 'mobile'
    setOpenTourModal(false)
    setOpenTour(deviceType === 'pc')
  }

  useEffect(() => {
    const orderForm = localStorage.getItem('orderForm')
    orderForm && setOrderForm(JSON.parse(orderForm))

    const currentProgress = localStorage.getItem('currentProgress')
    currentProgress && setCurrentProgress(parseInt(currentProgress))


    const viewedPage = !!localStorage.getItem('viewedPage')
    setOpenTourModal(!viewedPage)
    localStorage.setItem('viewedPage', 'true')
  }, [])

  return (
    <ConfigProvider locale={enUS}>
      <main className="main-area">
        <section className="top-area">
          <div className="home-bg"></div>
          <Divider className="mobile-divider" />
        </section>
        <section className="content">
          <OrderSteps currentProgress={currentProgress} orderForm={orderForm} setOrderForm={setOrderForm} tourRef1={tourRef1} tourRef2={tourRef2} />
          <div className="progress-btn">
            <span ref={tourRef3}>
              <Space size="middle">
                {currentProgress === 0 || <Button onClick={handlePreviousClick}>Previous</Button>}
                <Button type="primary" onClick={handleNextClick}>
                  {currentProgress === STEP_LENGTH ? 'Done' : 'Next'}
                </Button>
              </Space>
            </span>
          </div>
        </section>
        <WelcomeModal openTourModal={openTourModal} handleTourModalOk={handleTourModalOk} />
        <WelcomeTour openTour={openTour} setOpenTour={setOpenTour} tourRef1={tourRef1} tourRef2={tourRef2} tourRef3={tourRef3} tourRef4={tourRef4} />
      </main>
    </ConfigProvider>
  )
}

export default App
